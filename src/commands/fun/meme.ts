// => src/commands/fun/meme.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";
import { getMeme, type Meme } from "../../api/getMeme.js";
import { createEmbed } from "../../utils/components/embed.js";

/**
 * Command: meme
 * Replies with a random meme from an external API.
 */
export const command = {
  name: "meme",
  description: "Replies with a random meme!",
  data: new SlashCommandBuilder().setName("meme").setDescription("Replies with a random meme!"),
  enabled: true,

  async executeMessage(message: Message) {
    const meme = (await getMeme()) as Meme;

    const embed = createEmbed({
      title: "Random Meme",
      description: meme.title ?? "No description available",
      image: meme?.url ? { url: meme.url } : undefined,
      footer: { text: `Source: ${meme?.postLink}` },
      author: meme?.author ? { name: meme.author } : undefined,
      color: "#ff4500",
      timestamp: new Date(),
    });

    return await message.reply({ content: "Here's a random meme for you!", embeds: [embed] });
  },

  async executeSlash(interaction: ChatInputCommandInteraction) {
    const meme = (await getMeme()) as Meme;

    const embed = createEmbed({
      title: "Random Meme",
      description: meme.title ?? "No description available",
      image: meme?.url ? { url: meme.url } : undefined,
      footer: { text: `Source: ${meme?.postLink}` },
      author: meme?.author ? { name: meme.author } : undefined,
      color: "#ff4500",
      timestamp: new Date(),
    });

    return await interaction.reply({ content: "Here's a random meme for you!", embeds: [embed] });
  },
};
