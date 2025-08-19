// => src/commands/info/profile.ts

import { Message } from "discord.js";
import { createEmbed } from "../../utils/components/embed.js";
import { checkCooldown } from "../../utils/cooldown.js";

/**
 * Command: profile
 * Replies with the user's profile information.
 */
export const command = {
  name: "profile",
  description: "Replies with your profile information!",
  enabled: true,

  /**
   * Executes the profile command via a prefix message.
   *
   * @param message - Discord message object
   */
  async executeMessage(message: Message) {
    if (!checkCooldown("profile", message.author.id, 5000)) return;

    const embed = createEmbed({
      title: `${message.author.username}'s Profile`,
      description: "This is your profile information.",
      color: "#00ff00",
      fields: [
        { name: "Username", value: message.author.username },
        { name: "ID", value: message.author.id },
        { name: "Join Date", value: message.author.createdAt.toDateString() },
      ],
      footer: { text: "Profile Information", iconURL: message.author.displayAvatarURL() },
      thumbnail: { url: message.author.displayAvatarURL() },
      timestamp: new Date(),
    });

    return await message.reply({ content: "Here is your profile information:", embeds: [embed] });
  },
};
