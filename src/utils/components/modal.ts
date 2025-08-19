// => src/utils/components/modal.ts

import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

/**
 * Options for a single input in a modal.
 */
interface ModalInput {
  /** Custom ID for the input, used to identify it in interactions */
  customId: string;
  /** Label displayed above the input */
  label: string;
  /** Style of the input (Short or Paragraph). Defaults to Short */
  style?: TextInputStyle;
  /** Placeholder text displayed in the input */
  placeholder?: string;
  /** Whether this input is required. Defaults to true */
  required?: boolean;
  /** Minimum number of characters */
  minLength?: number;
  /** Maximum number of characters */
  maxLength?: number;
  /** Pre-filled value for the input */
  value?: string;
}

/**
 * Options for creating a modal.
 */
interface ModalOptions {
  /** Custom ID for the modal */
  customId: string;
  /** Title of the modal */
  title: string;
  /** Array of inputs to include in the modal */
  inputs: ModalInput[];
}

/**
 * Creates a Discord ModalBuilder with the provided inputs.
 *
 * @param options - Configuration object for the modal
 * @returns A new ModalBuilder instance
 *
 * @example
 * import { createModal } from "./utils/components/modal.js";
 * import { TextInputStyle } from "discord.js";
 *
 * const modal = createModal({
 *   customId: "feedback_modal",
 *   title: "Feedback Form",
 *   inputs: [
 *     { customId: "username", label: "Your Name", style: TextInputStyle.Short },
 *     { customId: "feedback", label: "Feedback", style: TextInputStyle.Paragraph }
 *   ]
 * });
 */
export function createModal(options: ModalOptions) {
  const modal = new ModalBuilder().setCustomId(options.customId).setTitle(options.title);

  options.inputs.forEach((input) => {
    const textInput = new TextInputBuilder()
      .setCustomId(input.customId)
      .setLabel(input.label)
      .setStyle(input.style ?? TextInputStyle.Short)
      .setRequired(input.required ?? true);

    if (input.placeholder) textInput.setPlaceholder(input.placeholder);
    if (input.minLength) textInput.setMinLength(input.minLength);
    if (input.maxLength) textInput.setMaxLength(input.maxLength);
    if (input.value) textInput.setValue(input.value);

    modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(textInput));
  });

  return modal;
}
