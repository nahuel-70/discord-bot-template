// => src/utils/loadCommands.ts

import { Client, Collection, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { config } from "../../config.js";
import { Command } from "../../types/Command.js";
import { logger } from "../logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively retrieves all .ts and .js command files in a directory.
 * @param dir - Directory path to search for command files
 * @returns Array of absolute paths to command files
 */
function getCommandFiles(dir: string): string[] {
  let files: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory() && !file.includes("dist")) {
      files = files.concat(getCommandFiles(fullPath));
    } else if (file.endsWith(".ts") || file.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Loads all commands from the commands directory and registers them with the client.
 * Supports both prefix and slash commands.
 *
 * Disabled commands (`enabled: false`) are skipped.
 * Slash commands are registered with Discord automatically if present.
 *
 * @param client - Discord.js client instance
 */
export async function loadCommands(client: Client) {
  client.commands = new Collection<string, Command>();

  const loadedCommands: string[] = [];
  const skippedCommands: string[] = [];
  const slashCommandsData: SlashCommandBuilder[] = [];

  const commandsPath = path.join(__dirname, "../../commands");
  const commandFiles = getCommandFiles(commandsPath);

  for (const file of commandFiles) {
    // Dynamically import command
    const { command } = (await import(pathToFileURL(file).href)) as { command: Command };

    // Skip disabled commands
    if (!command.enabled) {
      skippedCommands.push(command.name);
      continue;
    }

    // Register command in client's collection
    client.commands.set(command.name, command);
    loadedCommands.push(command.name);

    // If it's a slash command, collect data for Discord registration
    if (command.executeSlash && command.data instanceof SlashCommandBuilder) {
      slashCommandsData.push(command.data);
    }
  }

  // Register slash commands with Discord API
  if (slashCommandsData.length > 0) {
    const rest = new REST({ version: "10" }).setToken(config.token);
    try {
      await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
        body: slashCommandsData.map((cmd) => cmd.toJSON()),
      });
      logger.success("Slash commands registered successfully.");
    } catch (error) {
      logger.error("Failed to register slash commands: " + error);
    }
  }

  // Log results
  logger.info("Loaded commands:");
  loadedCommands.forEach((cmd) => logger.active(`   ${cmd}`));
  skippedCommands.forEach((cmd) => logger.inactive(`   ${cmd}`));
}
