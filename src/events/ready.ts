// => src/events/ready.ts

import { Client } from "discord.js";
import { logger } from "../utils/logger.js";

/**
 * Fired when the bot is fully logged in and ready.
 */
export const event = {
  /** Event name */
  name: "ready",
  /** Only execute once */
  once: true,
  /** Event enabled */
  enabled: true,

  /**
   * Executes when the bot is ready.
   * Logs a message with the bot's username.
   *
   * @param client - Discord.js client instance
   */
  execute(client: Client) {
    if (!client.user) return;
    logger.ready(`🤖 ${client.user.username} is online!`);
  },
};
