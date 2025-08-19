// => src/commands/info/info.ts

import { SlashCommandBuilder, ChatInputCommandInteraction, Message } from "discord.js";
import { createEmbed } from "../../utils/components/embed.js";
import { checkCooldown } from "../../utils/cooldown.js";

/**
 * Command: info
 * Replies with the server's information.
 */
export const command = {
  name: "info",
  description: "Replies with the server info!",
  data: new SlashCommandBuilder().setName("info").setDescription("Replies with the server info!"),
  enabled: true,

  /**
   * Executes the server info command via a prefix message.
   *
   * @param message - Discord message object
   */
  async executeMessage(message: Message) {
    const guild = message.guild;
    if (!guild) return message.reply("❌ This command can only be used in a server.");
    if (!checkCooldown("info", message.author.id, 5000)) return;

    const embed = createEmbed({
      title: `${guild.name} - Server Info`,
      description: "This is the server info.",
      color: "Blue",
      fields: [
        { name: "Server ID", value: guild.id, inline: true },
        { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
        { name: "Members", value: `${guild.memberCount}`, inline: true },
        { name: "Channels", value: `${guild.channels.cache.size}`, inline: true },
        { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
        { name: "Created On", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>` },
      ],
      thumbnail: { url: guild.iconURL() || "" },
    });

    return await message.reply({ embeds: [embed] });
  },

  /**
   * Executes the server info command via a slash command interaction.
   *
   * @param interaction - Discord slash command interaction
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild;
    if (!guild)
      return interaction.reply({
        content: "❌ This command can only be used in a server.",
        ephemeral: true,
      });
    if (!checkCooldown("info", interaction.user.id, 5000)) return;

    const embed = createEmbed({
      title: `${guild.name} - Server Info`,
      description: "This is the server info.",
      color: "Blue",
      fields: [
        { name: "Server ID", value: guild.id, inline: true },
        { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
        { name: "Members", value: `${guild.memberCount}`, inline: true },
        { name: "Channels", value: `${guild.channels.cache.size}`, inline: true },
        { name: "Roles", value: `${guild.roles.cache.size}`, inline: true },
        { name: "Created On", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>` },
      ],
      thumbnail: { url: guild.iconURL() || "" },
    });

    return await interaction.reply({ embeds: [embed] });
  },
};
