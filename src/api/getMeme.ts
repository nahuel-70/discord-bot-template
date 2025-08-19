// => src/api/getMeme.ts

import { logger } from "../utils/logger.js";

const API = "https://meme-api.com/gimme";

/**
 * Represents a meme fetched from the meme API.
 */
export interface Meme {
  postLink?: string;
  subreddit?: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author?: string;
  ups?: number;
  preview?: string[];
  error?: string;
}

/**
 * Fetches a random meme from the meme API.
 * @returns {Promise<Meme | { error: string }>} The meme object or an error object if fetching fails.
 */
export async function getMeme(): Promise<Meme | { error: string }> {
  try {
    const response = await fetch(API, { cache: "no-store" });
    if (!response.ok) {
      logger.error("Network response was not ok: " + response.statusText);
      return { error: "Sorry, I couldn't fetch a meme right now." };
    }
    const data: Meme = await response.json();
    if (data.nsfw === false) {
      return data;
    }
    return { error: "The fetched meme is NSFW and cannot be displayed." };
  } catch (error) {
    logger.error("There was a problem with the fetch operation: " + error);
    return { error: "Sorry, I couldn't fetch a meme right now." };
  }
}
