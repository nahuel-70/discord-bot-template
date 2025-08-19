// => src/commands/demo/select-menu-demo.ts

import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Message,
  MessageFlags,
  StringSelectMenuInteraction,
} from "discord.js";
import { createSelectMenu } from "../../utils/components/stringSelectMenu.js";
import { createActionRow } from "../../utils/components/actionRow.js";

const menu = createSelectMenu({
  customId: "string-select-menu-demo_menu",
  placeholder: "Choose an option",
  options: [
    { label: "Option 1", value: "option1", description: "This is the first option" },
    { label: "Option 2", value: "option2", description: "This is the second option" },
    { label: "Option 3", value: "option3", description: "This is the third option" },
  ],
  minValues: 1,
  maxValues: 1,
});

const row = createActionRow(menu);

export const command = {
  name: "string-select-menu-demo",
  description: "Demonstrates string-select-menu interactions",
  data: new SlashCommandBuilder()
    .setName("string-select-menu-demo")
    .setDescription("Demonstrates string-select-menu interactions"),
  enabled: true,

  /**
   * Sends a select menu in response to a message command.
   * @param {Message} message - The message that triggered the command.
   */
  async executeMessage(message: Message) {
    return await message.reply({
      content: "Choose an option from the menu below!",
      components: [row.toJSON()],
    });
  },

  /**
   * Sends a select menu in response to a slash command interaction.
   * @param {ChatInputCommandInteraction} interaction - The interaction object from Discord.
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    return await interaction.reply({
      content: "Choose an option from the menu below!",
      components: [row.toJSON()],
    });
  },

  /**
   * Handles the select menu interaction and replies with the selected value.
   * @param {StringSelectMenuInteraction} interaction - The select menu interaction.
   */
  async handleSelectMenu(interaction: StringSelectMenuInteraction) {
    if (interaction.customId !== "string-select-menu-demo_menu") return;

    const selected = interaction.values[0];
    return await interaction.reply({
      content: `You selected: ${selected}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
