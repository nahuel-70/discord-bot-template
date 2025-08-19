// => src/types/Event.d.ts

import { Client } from "discord.js";

/**
 * Represents an event in the bot.
 */
export interface Event {
  /** Event name, e.g., 'ready', 'messageCreate', 'interactionCreate' */
  name: string;
  /** Whether the event should be fired only once */
  once?: boolean;
  /** Whether the event is enabled */
  enabled?: boolean;
  /** Function executed when the event triggers */
  execute: (...args: [...any[], Client]) => Promise<void> | void;
}
