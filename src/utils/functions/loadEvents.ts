// => src/utils/loadEvents.ts

import { Client } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Event } from "../../types/Event.js";
import { logger } from "../logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Dynamically loads all event files from the `events` directory and registers them with the client.
 *
 * Each event file must export an `event` object of type `Event`.
 * Disabled events (`enabled: false`) are skipped.
 * Supports `once` events and recurring events.
 *
 * @param client - Discord.js client instance
 */
export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, "../../events");
  const loadedEvents: string[] = [];
  const skippedEvents: string[] = [];

  for (const file of fs.readdirSync(eventsPath)) {
    // Skip non-js/ts files
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

    // Dynamically import the event
    const { event } = (await import(pathToFileURL(path.join(eventsPath, file)).href)) as {
      event: Event;
    };

    // Skip disabled events
    if (event.enabled === false) {
      skippedEvents.push(event.name);
      continue;
    }

    // Register event with the client
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    loadedEvents.push(event.name);
  }

  // Log results
  logger.info("Loaded events:");
  loadedEvents.forEach((event) => logger.active(`   ${event}`));
  skippedEvents.forEach((event) => logger.inactive(`   ${event}`));
}
