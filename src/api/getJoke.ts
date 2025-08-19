// => src/api/getJoke.ts

import { logger } from "../utils/logger.js";

const API = "https://official-joke-api.appspot.com/jokes/random";

/**
 * Represents a joke from the API.
 */
interface Joke {
  setup: string;
  punchline: string;
}

/**
 * Fetches a random joke from the official joke API.
 * @returns {Promise<string>} The joke in the format "setup - punchline" or an error message.
 */
export async function getJoke(): Promise<string> {
  try {
    const response = await fetch(API, { cache: "no-store" });
    if (!response.ok) {
      logger.error("Network response was not ok: " + response.statusText);
      return "Sorry, I couldn't fetch a joke right now.";
    }
    const data: Joke = await response.json();
    return `${data.setup} - ${data.punchline}`;
  } catch (error) {
    logger.error("There was a problem with the fetch operation: " + error);
    return "Sorry, I couldn't fetch a joke right now.";
  }
}
