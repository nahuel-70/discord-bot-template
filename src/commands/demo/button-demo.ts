// => src/commands/demo/button-demo.ts

import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Message,
  ButtonInteraction,
  ButtonStyle,
  MessageFlags,
} from "discord.js";
import { createButton } from "../../utils/components/button.js";
import { createActionRow } from "../../utils/components/actionRow.js";

const clicks = new Map<string, number>();

const primaryButton = createButton({
  customId: "button-demo_primary",
  label: "Click Me!",
  style: ButtonStyle.Primary,
});
const secondaryButton = createButton({
  customId: "button-demo_secondary",
  label: "Click Me!",
  style: ButtonStyle.Secondary,
});
const row = createActionRow(primaryButton, secondaryButton);

export const command = {
  name: "button-demo",
  description: "Demonstrates button interactions",
  data: new SlashCommandBuilder()
    .setName("button-demo")
    .setDescription("Demonstrates button interactions"),
  enabled: true,

  /**
   * Sends a row of buttons in response to a message command.
   * @param {Message} message - The message that triggered the command.
   */
  async executeMessage(message: Message) {
    return await message.reply({ content: "Click the buttons below!", components: [row.toJSON()] });
  },

  /**
   * Sends a row of buttons in response to a slash command.
   * @param {ChatInputCommandInteraction} interaction - The slash command interaction.
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    return await interaction.reply({
      content: "Click the buttons below!",
      components: [row.toJSON()],
    });
  },

  /**
   * Handles button interactions and replies accordingly.
   * Tracks number of clicks for the primary button.
   * @param {ButtonInteraction} interaction - The button interaction.
   */
  async handleButton(interaction: ButtonInteraction) {
    if (interaction.customId === "button-demo_primary") {
      const userId = interaction.user.id;
      const currentCount = clicks.get(userId) || 0;
      clicks.set(userId, currentCount + 1);

      return await interaction.reply({
        content: `You have clicked the button ${currentCount + 1} times!`,
        flags: MessageFlags.Ephemeral,
      });
    } else {
      return await interaction.reply({
        content: "You clicked the button!",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
