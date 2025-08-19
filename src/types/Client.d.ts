// => src/types/Client.d.ts

import { Client, Collection } from "discord.js";
import { Command } from "./Command";

/**
 * Extends the Discord.js Client to include a commands collection.
 * This allows storing all loaded commands for easy access throughout the bot.
 */
declare module "discord.js" {
  interface Client {
    /** Collection of commands, keyed by command name */
    commands: Collection<string, Command>;
  }
}
