// => src/commands/utils/embed.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";
import { createEmbed } from "../../utils/components/embed.js";

/**
 * Command: embed
 * Replies with a sample embedded message.
 */
export const command = {
  name: "embed",
  description: "Replies with an embedded message!",
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Replies with an embedded message!"),
  enabled: true,

  /**
   * Executes the embed command via a prefix message.
   *
   * @param message - Discord message object
   */
  async executeMessage(message: Message) {
    const embed = createEmbed({
      title: "Embedded Message",
      description: "This is an example of an embedded message.",
      color: "#0099ff",
      fields: [
        { name: "Field 1", value: "This is the first field." },
        { name: "Field 2", value: "This is the second field." },
      ],
      footer: { text: "Footer text here" },
      thumbnail: { url: "https://example.com/thumbnail.png" },
      image: { url: "https://example.com/image.png" },
      author: {
        name: "Author Name",
        iconURL: "https://example.com/author.png",
        url: "https://example.com",
      },
      timestamp: new Date(),
    });

    return await message.reply({ content: "Here is your embedded message:", embeds: [embed] });
  },

  /**
   * Executes the embed command via a slash command interaction.
   *
   * @param interaction - Discord slash command interaction
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    const embed = createEmbed({
      title: "Embedded Message",
      description: "This is an example of an embedded message.",
      color: "#0099ff",
      fields: [
        { name: "Field 1", value: "This is the first field." },
        { name: "Field 2", value: "This is the second field." },
      ],
      footer: { text: "Footer text here" },
      thumbnail: { url: "https://example.com/thumbnail.png" },
      image: { url: "https://example.com/image.png" },
      author: {
        name: "Author Name",
        iconURL: "https://example.com/author.png",
        url: "https://example.com",
      },
      timestamp: new Date(),
    });

    return await interaction.reply({ content: "Here is your embedded message:", embeds: [embed] });
  },
};
