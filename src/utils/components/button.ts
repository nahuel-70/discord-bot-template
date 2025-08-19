// => src/utils/components/button.ts

import { ButtonBuilder, ButtonStyle } from "discord.js";

/**
 * Options for creating a Discord button.
 */
interface ButtonOptions {
  /** Custom ID used to identify the button in interactions */
  customId: string;
  /** Text displayed on the button */
  label: string;
  /** Button style (Primary, Secondary, Success, Danger, Link). Defaults to Primary */
  style?: ButtonStyle;
  /** Optional emoji displayed on the button */
  emoji?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** URL for link buttons (required if style is Link) */
  url?: string;
}

/**
 * Creates a Discord ButtonBuilder with the provided options.
 *
 * @param options - Configuration object for the button
 * @returns A new ButtonBuilder instance
 *
 * @example
 * import { createButton } from "./utils/components/button.js";
 * import { ButtonStyle } from "discord.js";
 *
 * const button = createButton({
 *   customId: "my_button",
 *   label: "Click Me",
 *   style: ButtonStyle.Success,
 *   emoji: "✅"
 * });
 */
export function createButton(options: ButtonOptions) {
  const button = new ButtonBuilder()
    .setCustomId(options.customId)
    .setLabel(options.label)
    .setStyle(options.style ?? ButtonStyle.Primary);

  if (options.emoji) button.setEmoji(options.emoji);
  if (options.disabled !== undefined) button.setDisabled(options.disabled);
  if (options.url) button.setURL(options.url);

  return button;
}
