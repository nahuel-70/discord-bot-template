// => src/database/getMessage.ts

import { connectDB } from "../database/connection.js";
import { logger } from "../utils/logger.js";

/**
 * Fetches a message from the database.
 * Tries to get a random message from a `messages` table/collection.
 */
export async function getMessage(): Promise<string> {
  const db = await connectDB();
  if (!db) {
    return "No database connected or supported library installed.";
  }

  try {
    // MongoDB
    if (db.model) {
      const Messages = db.model("Message", new db.Schema({ text: String }));
      const count = await Messages.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const msg = await Messages.findOne().skip(randomIndex).exec();
      return msg?.text || "No message found in MongoDB";
    }

    // PostgreSQL
    if (db.query) {
      const res = await db.query("SELECT text FROM messages ORDER BY RANDOM() LIMIT 1");
      return res.rows[0]?.text || "No message found in PostgreSQL";
    }

    // MySQL
    if (db.execute) {
      const [rows]: any = await db.execute("SELECT text FROM messages ORDER BY RAND() LIMIT 1");
      return rows[0]?.text || "No message found in MySQL";
    }

    // SQLite
    if (db.all) {
      return new Promise((resolve, reject) => {
        db.all("SELECT text FROM messages ORDER BY RANDOM() LIMIT 1", (err: any, rows: any) => {
          if (err) return reject(err);
          resolve(rows[0]?.text || "No message found in SQLite");
        });
      });
    }

    return "Database type not recognized.";
  } catch (err) {
    logger.error("Error fetching message: " + err);
    return "Error fetching message from the database.";
  }
}
