// => src/utils/components/embed.ts

import { ColorResolvable, EmbedBuilder } from "discord.js";

/**
 * Options for creating a Discord embed.
 */
interface EmbedOptions {
  /** Title of the embed */
  title: string;
  /** Description of the embed */
  description: string;
  /** Color of the embed (can be hex, number, or predefined color) */
  color: ColorResolvable;
  /** Optional array of fields */
  fields?: { name: string; value: string; inline?: boolean }[];
  /** Optional footer information */
  footer?: { text: string; iconURL?: string };
  /** Optional author information */
  author?: { name: string; iconURL?: string; url?: string };
  /** Optional thumbnail */
  thumbnail?: { url: string | undefined };
  /** Optional main image */
  image?: { url: string };
  /** Optional timestamp */
  timestamp?: Date;
}

/**
 * Creates a Discord EmbedBuilder with the provided options.
 *
 * @param options - Configuration object for the embed
 * @returns A new EmbedBuilder instance
 *
 * @example
 * import { createEmbed } from "./utils/components/embed.js";
 *
 * const embed = createEmbed({
 *   title: "Test Embed",
 *   description: "This is a test embed",
 *   color: "#00FF00",
 *   fields: [{ name: "Field 1", value: "Value 1", inline: true }],
 *   footer: { text: "Footer text" },
 *   timestamp: new Date()
 * });
 */
export function createEmbed(options: EmbedOptions) {
  const embed = new EmbedBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setColor(options.color);

  if (options.fields) embed.addFields(options.fields);
  if (options.author) embed.setAuthor(options.author);
  if (options.footer) embed.setFooter(options.footer);
  if (options.thumbnail) embed.setThumbnail(options.thumbnail.url || null);
  if (options.image) embed.setImage(options.image.url);
  if (options.timestamp) embed.setTimestamp(options.timestamp);

  return embed;
}
