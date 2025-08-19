// => src/config.ts

import "dotenv/config";

/**
 * Global configuration object.
 * Loads all environment variables used by the bot and its integrations.
 */
export const config = {
  // Discord
  token: process.env.BOT_TOKEN ?? "",
  clientId: process.env.CLIENT_ID ?? "",
  guildId: process.env.GUILD_ID ?? "",
  prefix: "!",

  // MySQL
  mysql: {
    host: process.env.MYSQL_HOST ?? "localhost",
    user: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DB ?? "discord_bot",
  },

  // PostgreSQL
  postgres: {
    host: process.env.PG_HOST ?? "localhost",
    user: process.env.PG_USER ?? "postgres",
    password: process.env.PG_PASSWORD ?? "",
    database: process.env.PG_DB ?? "discord_bot",
    port: parseInt(process.env.PG_PORT ?? "5432", 10),
  },

  // MongoDB
  mongo: {
    uri: process.env.MONGO_URI ?? "mongodb://localhost:27017",
    dbName: process.env.MONGO_DB ?? "discord_bot",
  },

  // SQLite
  sqlite: {
    path: process.env.SQLITE_PATH ?? "./data/database.sqlite",
  },
};
