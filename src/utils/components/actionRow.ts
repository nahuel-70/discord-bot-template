// => src/utils/components/action-row.ts

import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
} from "discord.js";

/**
 * Creates a Discord ActionRow with the given components.
 * Supports Buttons, Select Menus, and Text Inputs.
 *
 * @param components - One or more Discord components (ButtonBuilder, StringSelectMenuBuilder, or TextInputBuilder)
 * @returns A new ActionRowBuilder containing the provided components
 *
 * @example
 * import { createActionRow } from "./utils/components/action-row.js";
 * import { ButtonBuilder, ButtonStyle } from "discord.js";
 *
 * const row = createActionRow(
 *   new ButtonBuilder()
 *     .setCustomId("btn_1")
 *     .setLabel("Click me")
 *     .setStyle(ButtonStyle.Primary)
 * );
 */
export function createActionRow(
  ...components: (ButtonBuilder | StringSelectMenuBuilder)[] | TextInputBuilder[]
) {
  return new ActionRowBuilder<
    ButtonBuilder | StringSelectMenuBuilder | TextInputBuilder
  >().addComponents(components);
}
