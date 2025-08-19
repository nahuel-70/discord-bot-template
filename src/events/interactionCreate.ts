// => src/events/interactionCreate.ts

import { Client, Interaction } from "discord.js";
import { Command } from "../types/Command.js";

/**
 * Map interaction types to the corresponding command handler method.
 */
const interactionMethodMap = [
  { check: (i: Interaction) => i.isChatInputCommand(), method: "executeSlash" },
  { check: (i: Interaction) => i.isButton(), method: "handleButton" },
  { check: (i: Interaction) => i.isStringSelectMenu(), method: "handleSelectMenu" },
  { check: (i: Interaction) => i.isModalSubmit(), method: "handleModal" },
] as const;

/**
 * Fired whenever an interaction is created (slash command, button, select menu, modal).
 * Determines the type of interaction and executes the corresponding command handler.
 */
export const event = {
  /** Event name */
  name: "interactionCreate",
  /** This event can fire multiple times */
  once: false,
  /** Event enabled */
  enabled: true,

  /**
   * Executes when an interaction is created.
   *
   * @param interaction - The interaction object
   * @param client - Discord.js client instance
   */
  async execute(interaction: Interaction, client: Client) {
    for (const { check, method } of interactionMethodMap) {
      if (!check(interaction)) continue;

      const commandName = interaction.isChatInputCommand()
        ? interaction.commandName
        : interaction.customId.split("_")[0];

      const command = client.commands.get(commandName);
      if (!command) return;

      const handler = command[method as keyof Command] as ((i: any) => Promise<void>) | undefined;
      if (handler) await handler(interaction);

      return;
    }
  },
};
