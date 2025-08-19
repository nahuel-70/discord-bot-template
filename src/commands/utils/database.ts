// => src/commands/utils/database.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";
import { getMessage } from "../../database/getMessage.js";

/**
 * /database command
 * Fetches a message from the database and replies to the user.
 */
export const command = {
  name: "database",
  description: "Replies with a message from the database!",
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Replies with a message from the database!"),
  enabled: true,

  /**
   * Executes the command when triggered via a normal message.
   * @param {Message} message The Discord message object
   */
  async executeMessage(message: Message) {
    const msg = await getMessage();
    return await message.reply({ content: msg });
  },

  /**
   * Executes the command when triggered via a slash command.
   * @param {ChatInputCommandInteraction} interaction The Discord slash command interaction
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    const msg = await getMessage();
    return await interaction.reply({ content: msg });
  },
};
