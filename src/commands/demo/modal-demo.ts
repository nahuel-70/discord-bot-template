// => src/commands/demo/modal-demo.ts

import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  TextInputStyle,
  ModalSubmitInteraction,
  MessageFlags,
} from "discord.js";
import { createModal } from "../../utils/components/modal.js";

const modal = createModal({
  customId: "modal-demo_modal",
  title: "Demo Modal",
  inputs: [
    {
      customId: "input1",
      label: "First Input",
      style: TextInputStyle.Short,
      placeholder: "Enter something...",
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    {
      customId: "input2",
      label: "Second Input",
      style: TextInputStyle.Paragraph,
      placeholder: "Enter more details...",
      required: false,
      minLength: 0,
      maxLength: 4000,
    },
  ],
});

export const command = {
  name: "modal-demo",
  description: "Demonstrates modal interactions",
  data: new SlashCommandBuilder()
    .setName("modal-demo")
    .setDescription("Demonstrates modal interactions"),
  enabled: true,

  /**
   * Shows the modal to the user in response to a slash command.
   * @param {ChatInputCommandInteraction} interaction - The slash command interaction.
   */
  async executeSlash(interaction: ChatInputCommandInteraction) {
    return await interaction.showModal(modal);
  },

  /**
   * Handles the submitted modal and replies with the input values.
   * @param {ModalSubmitInteraction} interaction - The modal submission interaction.
   */
  async handleModal(interaction: ModalSubmitInteraction) {
    if (interaction.customId !== "modal-demo_modal") return;

    const input1 = interaction.fields.getTextInputValue("input1");
    const input2 = interaction.fields.getTextInputValue("input2");

    return await interaction.reply({
      content: `${input1} \n\n${input2}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
