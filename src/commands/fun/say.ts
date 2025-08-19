// => src/commands/fun/say.ts

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

/**
 * Command: say
 * Replies with the provided message from the user.
 */
export const command = {
  name: "say",
  description: "Replies with a message!",
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Replies with a message!")
    .addStringOption((option) =>
      option
        .setName("detail")
        .setDescription("Additional details to include in the response")
        .setRequired(true)
    ),
  enabled: false, // Disabled by default

  /**
   * Executes the say command via a slash command interaction.
   *
   * @param interaction - Discord slash command interaction
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    const message = interaction.options.getString("detail");
    return await interaction.reply({ content: `You said: ${message}` });
  },
};
