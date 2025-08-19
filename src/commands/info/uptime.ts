// => src/commands/info/uptime.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";

const uptime = process.uptime();

/**
 * Command: uptime
 * Replies with the bot's uptime in hours, minutes, and seconds.
 */
export const command = {
  /** Command name */
  name: "uptime",
  /** Command description */
  description: "Replies with the bot's uptime!",
  /** Slash command data */
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Replies with the bot's uptime!"),
  /** Whether the command is enabled */
  enabled: true,

  /**
   * Executes the uptime command via a prefix message.
   *
   * @param message - Discord message object
   * @returns A reply with the bot's uptime
   */
  async executeMessage(message: Message) {
    return await message.reply({
      content: `⏳ Uptime: ${Math.floor(uptime / 3600)} hours, ${Math.floor((uptime % 3600) / 60)} minutes, ${Math.floor(uptime % 60)} seconds.`,
    });
  },

  /**
   * Executes the uptime command via a slash command interaction.
   *
   * @param interaction - Discord slash command interaction
   * @returns A reply with the bot's uptime
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    return await interaction.reply({
      content: `⏳ Uptime: ${Math.floor(uptime / 3600)} hours, ${Math.floor((uptime % 3600) / 60)} minutes, ${Math.floor(uptime % 60)} seconds.`,
    });
  },
};
