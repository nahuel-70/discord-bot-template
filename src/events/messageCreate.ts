// => src/events/messageCreate.ts

import { Client, Message } from "discord.js";
import { config } from "../config.js";
import { Command } from "../types/Command.js";

/**
 * Fired whenever a new message is created in a guild.
 * Handles prefix commands and executes their corresponding function.
 */
export const event = {
  /** Event name */
  name: "messageCreate",
  /** This event can fire multiple times */
  once: false,
  /** Event enabled */
  enabled: true,

  /**
   * Executes when a message is created.
   * Filters messages by prefix and ignores bot messages.
   *
   * @param message - The message object
   * @param client - Discord.js client instance
   */
  async execute(message: Message, client: Client) {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command: Command | undefined = client.commands.get(commandName);
    if (!command || !command.executeMessage) return;

    await command.executeMessage(message, args);
  },
};
