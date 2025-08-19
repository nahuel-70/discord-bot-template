// => src/database/connection.ts

import { config } from "../config.js";
import { logger } from "../utils/logger.js";

type DBClient = any;

let db: DBClient | null = null;

/**
 * Attempts to connect to a supported database.
 * Supports MongoDB, PostgreSQL, MySQL, and SQLite based on installed packages.
 * Returns the database client instance if successful, or null otherwise.
 *
 * @async
 * @returns {Promise<DBClient | null>} The connected database client or null
 */
export async function connectDB(): Promise<DBClient | null> {
  try {
    if (tryRequire("mongoose")) {
      const mongoose = require("mongoose");
      await mongoose.connect(config.mongo.uri, {
        dbName: config.mongo.dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = mongoose;
      logger.info("Connected to MongoDB");
    } else if (tryRequire("pg")) {
      const { Client } = require("pg");
      const client = new Client({
        host: config.postgres.host,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.database,
        port: config.postgres.port,
      });
      await client.connect();
      db = client;
      logger.info("Connected to PostgreSQL");
    } else if (tryRequire("mysql2")) {
      const mysql = require("mysql2/promise");
      const connection = await mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database,
      });
      db = connection;
      logger.info("Connected to MySQL");
    } else if (tryRequire("sqlite3")) {
      const sqlite3 = require("sqlite3").verbose();
      db = new sqlite3.Database(config.sqlite.path);
      logger.info(`Connected to SQLite (${config.sqlite.path})`);
    } else {
      logger.warn("No supported DB library installed. Skipping DB connection.");
    }
  } catch (err) {
    logger.error("Database connection failed: " + err);
  }

  return db;
}

/**
 * Checks if a Node.js package is installed.
 *
 * @param {string} pkg The package name to check
 * @returns {boolean} True if the package is installed, false otherwise
 */
function tryRequire(pkg: string): boolean {
  try {
    require.resolve(pkg);
    return true;
  } catch {
    return false;
  }
}
