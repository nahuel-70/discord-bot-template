// => src/utils/cooldown.ts

/**
 * Map to store cooldowns for commands.
 * Structure: commandName -> (userId -> lastExecutionTimestamp)
 */
const cooldowns = new Map<string, Map<string, number>>();

/**
 * Checks if a user can execute a command based on cooldown time.
 *
 * @param commandName - Name of the command being executed.
 * @param userId - Discord user ID of the command executor.
 * @param cooldown - Cooldown duration in milliseconds.
 * @returns `true` if the command can be executed (cooldown expired or not set), `false` otherwise.
 *
 * @example
 * if (!checkCooldown("ping", interaction.user.id, 5000)) {
 *   return interaction.reply({ content: "⏳ Please wait before using this command again.", ephemeral: true });
 * }
 */
export function checkCooldown(commandName: string, userId: string, cooldown: number): boolean {
  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Map());
  }

  const userCooldowns = cooldowns.get(commandName)!;
  const now = Date.now();

  if (userCooldowns.has(userId)) {
    const expiration = userCooldowns.get(userId)! + cooldown;
    if (now < expiration) {
      return false; // Still in cooldown
    }
  }

  userCooldowns.set(userId, now);
  return true;
}
