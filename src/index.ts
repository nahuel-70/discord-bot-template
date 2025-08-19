// => src/index.ts

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { config } from "./config.js";
import { loadCommands } from "./utils/functions/loadCommands.js";
import { loadEvents } from "./utils/functions/loadEvents.js";
import { Command } from "./types/Command.js";
import { logger } from "./utils/logger.js";

/**
 * Main Discord client instance.
 * Handles bot initialization, command/event loading and login.
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Required for slash commands
    GatewayIntentBits.GuildMessages, // Required for messageCreate events
    GatewayIntentBits.MessageContent, // Required for reading message content (prefix commands)
  ],
});

// Store all registered commands (prefix and slash)
client.commands = new Collection<string, Command>();

/**
 * Initialize bot:
 * - Load commands
 * - Load events
 * - Setup global error handlers
 * - Login client
 */
async function init() {
  await loadCommands(client);
  await loadEvents(client);

  // Global error handlers
  process.on("unhandledRejection", (reason) =>
    logger.error("Unhandled promise rejection: " + reason)
  );
  process.on("uncaughtException", (err) => logger.error("Uncaught exception: " + err));

  await client.login(config.token);
}

init().catch((err) => logger.error("Failed to initialize bot: " + err));
