// => src/utils/components/stringSelectMenu.ts

import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

/**
 * Options for a single choice in a select menu.
 */
interface SelectOption {
  /** Label displayed for the option */
  label: string;
  /** Value returned when this option is selected */
  value: string;
  /** Optional description shown below the label */
  description?: string;
  /** Optional emoji displayed next to the label */
  emoji?: string;
  /** Whether this option is selected by default */
  default?: boolean;
}

/**
 * Options for creating a Discord string select menu.
 */
interface SelectMenuOptions {
  /** Custom ID for the select menu */
  customId: string;
  /** Placeholder text displayed when no option is selected */
  placeholder?: string;
  /** Minimum number of selections allowed (default 1) */
  minValues?: number;
  /** Maximum number of selections allowed (default 1) */
  maxValues?: number;
  /** Array of select menu options */
  options: SelectOption[];
}

/**
 * Creates a Discord StringSelectMenuBuilder with the provided options.
 *
 * @param options - Configuration object for the select menu
 * @returns A new StringSelectMenuBuilder instance
 *
 * @example
 * import { createSelectMenu } from "./utils/components/stringSelectMenu.js";
 *
 * const menu = createSelectMenu({
 *   customId: "color_select",
 *   placeholder: "Choose a color",
 *   options: [
 *     { label: "Red", value: "red", emoji: "🔴" },
 *     { label: "Green", value: "green", emoji: "🟢", default: true },
 *     { label: "Blue", value: "blue", emoji: "🔵" }
 *   ]
 * });
 */
export function createSelectMenu(options: SelectMenuOptions) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(options.customId)
    .setPlaceholder(options.placeholder ?? "Select an option")
    .setMinValues(options.minValues ?? 1)
    .setMaxValues(options.maxValues ?? 1);

  options.options.forEach((opt) => {
    const option = new StringSelectMenuOptionBuilder().setLabel(opt.label).setValue(opt.value);

    if (opt.description) option.setDescription(opt.description);
    if (opt.emoji) option.setEmoji(opt.emoji);
    if (opt.default) option.setDefault(true);

    menu.addOptions(option);
  });

  return menu;
}
