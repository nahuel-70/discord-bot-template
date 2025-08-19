// => src/commands/fun/joke.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";
import { getJoke } from "../../api/getJoke.js";

/**
 * Command: joke
 * Replies with a random joke from an external API.
 */
export const command = {
  name: "joke",
  description: "Replies with a random joke!",
  data: new SlashCommandBuilder().setName("joke").setDescription("Replies with a random joke!"),
  enabled: true,

  /**
   * Executes the joke command via a prefix message.
   *
   * @param message - Discord message object
   */
  async executeMessage(message: Message) {
    const joke = await getJoke();
    return await message.reply({ content: `${joke}` });
  },

  /**
   * Executes the joke command via a slash command interaction.
   *
   * @param interaction - Discord slash command interaction
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    const joke = await getJoke();
    return await interaction.reply({ content: `${joke}` });
  },
};
