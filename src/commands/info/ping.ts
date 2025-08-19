// => src/commands/info/ping.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";

/**
 * Command: ping
 * Simple test command that replies with "Pong!".
 */
export const command = {
  /** Command name */
  name: "ping",
  /** Command description */
  description: "Replies with Pong!",
  /** Slash command data */
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  /** Whether the command is enabled */
  enabled: true,

  /**
   * Executes the ping command via a prefix message.
   *
   * @param message - Discord message object
   * @returns A reply with "Pong!"
   */
  async executeMessage(message: Message) {
    return await message.reply({ content: "🏓 Pong!" });
  },

  /**
   * Executes the ping command via a slash command interaction.
   *
   * @param interaction - Discord slash command interaction
   * @returns A reply with "Pong!"
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    return await interaction.reply({ content: "🏓 Pong!" });
  },
};
