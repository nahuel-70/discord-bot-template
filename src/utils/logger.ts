// => src/utils/logger.ts

import chalk from "chalk";

/**
 * Log levels supported by the Logger.
 */
type LogLevel = "info" | "success" | "error" | "warn" | "debug" | "active" | "inactive" | "ready";

/**
 * Logger utility for consistent and colorized console output.
 * Wraps console.log with different log levels and prefixes.
 */
class Logger {
  /**
   * Returns the prefix string for a given log level.
   */
  private getPrefix(level: LogLevel) {
    switch (level) {
      case "info":
        return chalk.blue("[INFO] ");
      case "success":
        return chalk.green("[SUCCESS] ");
      case "error":
        return chalk.red("[ERROR] ");
      case "warn":
        return chalk.yellow("[WARN] ");
      case "debug":
        return chalk.gray("[DEBUG] ");
      case "active":
        return chalk.greenBright("[ACTIVE] ");
      case "inactive":
        return chalk.redBright("[INACTIVE] ");
      case "ready":
        return chalk.cyan("[READY] ");
      default:
        return "[LOG] ";
    }
  }

  /** Log an info message. */
  info(message: string | string[]) {
    this.print("info", message);
  }

  /** Log a success message. */
  success(message: string | string[]) {
    this.print("success", message);
  }

  /** Log an error message. */
  error(message: string | string[]) {
    this.print("error", message);
  }

  /** Log a warning message. */
  warn(message: string | string[]) {
    this.print("warn", message);
  }

  /** Log a debug message. */
  debug(message: string | string[]) {
    this.print("debug", message);
  }

  /** Log an "active" status message. */
  active(message: string | string[]) {
    this.print("active", message);
  }

  /** Log an "inactive" status message. */
  inactive(message: string | string[]) {
    this.print("inactive", message);
  }

  /** Log a "ready" status message. */
  ready(message: string | string[]) {
    this.print("ready", message);
  }

  /**
   * Internal print function used by all log methods.
   */
  private print(level: LogLevel, message: string | string[]) {
    const prefix = this.getPrefix(level);
    if (Array.isArray(message)) {
      message.forEach((msg) => console.log(`${prefix} ${msg}`));
    } else {
      console.log(`${prefix} ${message}`);
    }
  }
}

/**
 * Global logger instance to be used throughout the project.
 */
export const logger = new Logger();
