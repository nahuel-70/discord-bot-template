// => src/types/Commands.d.ts

import {
  ChatInputCommandInteraction,
  Message,
  ButtonInteraction,
  StringSelectMenuInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from "discord.js";

/**
 * Represents a command in the bot.
 * Can be a prefix command, a slash command, or handle component interactions.
 */
export interface Command {
  /** Command data for slash commands (SlashCommandBuilder) or basic info for prefix commands */
  data:
    | SlashCommandBuilder
    | {
        name: string;
        description?: string;
      };
  /** Command name */
  name: string;
  /** Command description */
  description?: string;
  /** Whether the command should run only once (optional) */
  once?: boolean;
  /** Whether the command is enabled */
  enabled?: boolean;
  /** Function to execute on a message-based (prefix) command */
  executeMessage?: (message: Message, args: string[]) => Promise<void>;
  /** Function to execute on a slash command interaction */
  executeSlash?: (interaction: ChatInputCommandInteraction) => Promise<void>;
  /** Function to handle button interactions for this command */
  handleButton?: (interaction: ButtonInteraction) => Promise<void>;
  /** Function to handle string select menu interactions */
  handleSelectMenu?: (interaction: StringSelectMenuInteraction) => Promise<void>;
  /** Function to handle modal submit interactions */
  handleModal?: (interaction: ModalSubmitInteraction) => Promise<void>;
}
