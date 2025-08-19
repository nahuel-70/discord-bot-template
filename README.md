# 🤖 Discord Bot Template

A fully-featured Discord bot template built with TypeScript and Discord.js, designed for developers to quickly create bots with commands, interactions, and APIs.

## 📌 Introduction

This template provides a solid foundation for building Discord bots with:

- Slash commands, message commands, buttons, select menus, and modals.
- Easy integration with APIs for jokes, memes, or custom data.
- Clean code structure, logging, and cooldowns management.
- Ready-to-use utilities for embeds, components, and more.

Perfect for learning, prototyping, or launching your own bot.

## ✨ Features

- ⚡ Slash commands and message commands support
- 🎛️ Interactive components: buttons, modals, and select menus
- 📦 Built-in cooldown system for commands
- 🌐 API integrations (Jokes and Memes)
- 🛡️ TypeScript + type safety
- 🔍 Logger with colored levels for easy debugging

## 🛠️ Stack

- TypeScript
- Discord.js v1
- Node.js & npm
- Prettier for consistent formatting
- ESLint for code quality

## 🗂️ Project Structure

```txt
/
├── .vscode/
│   └── settings.json                 # Editor/formatting preferences (e.g. Prettier on save)
│
├── src/                              # Source code of the Discord bot
│   ├── api/                          # API integrations (external data)
│   │   ├── getJoke.ts                # Fetches a random joke from Official Joke API
│   │   └── getMeme.ts                # Fetches a meme from Meme API
│   │
│   ├── commands/                     # All bot commands (organized by category)
│   │   ├── demo/                     # Example/demo commands
│   │   │   ├── button-demo.ts        # Example command using buttons
│   │   │   ├── modal-demo.ts         # Example command using modals
│   │   │   └── string-select-menu-demo.ts # Example command using select menus
│   │   │
│   │   ├── fun/                      # Entertainment/fun commands
│   │   │   ├── joke.ts               # Sends a random joke
│   │   │   ├── meme.ts               # Sends a random meme
│   │   │   └── say.ts                # Repeats the user’s input
│   │   │
│   │   ├── info/                     # Informational commands
│   │   │   ├── info.ts               # Shows bot information
│   │   │   ├── ping.ts               # Checks bot latency
│   │   │   ├── profile.ts            # Displays user profile info
│   │   │   └── uptime.ts             # Shows how long the bot has been running
│   │   │
│   │   └── utils/                    # Utility commands
│   │       ├── database.ts           # Example command to test database
│   │       └── embed.ts              # Example command with embed usage
│   │
│   ├── database/                     # Database connections and helper functions
│   │   ├── connection.ts             # Handles dynamic DB connections (MongoDB, PostgreSQL, MySQL, SQLite)
│   │   └── getMessage.ts             # Retrieves a stored message from the configured database
│   │
│   ├── events/                       # Discord client event handlers
│   │   ├── interactionCreate.ts      # Handles button/menu/modal interactions
│   │   ├── messageCreate.ts          # Handles new messages
│   │   └── ready.ts                  # Fires when the bot is ready
│   │
│   ├── types/                        # Custom TypeScript type definitions
│   │   ├── Client.d.ts               # Extended Client type with extra properties
│   │   ├── Command.d.ts              # Interface for commands
│   │   └── Event.d.ts                # Interface for events
│   │
│   ├── utils/                        # General utilities/helpers
│   │   ├── components/               # Prebuilt Discord components
│   │   │   ├── actionRow.ts
│   │   │   ├── button.ts
│   │   │   ├── embed.ts
│   │   │   ├── modal.ts
│   │   │   └── stringSelectMenu.ts
│   │   │
│   │   ├── functions/                # Auto-loaders and helpers
│   │   │   ├── loadCommands.ts       # Dynamically loads all commands
│   │   │   └── loadEvents.ts         # Dynamically loads all events
│   │   │
│   │   ├── cooldown.ts               # Command cooldown manager
│   │   └── logger.ts                 # Logger with colored levels
│   │
│   ├── config.ts                     # Centralized configuration (env vars, constants)
│   └── index.ts                      # Entry point — starts the bot
│
├── .env.example                      # Example environment variables file
├── .eslintrc.json                    # ESLint configuration for code quality
├── .gitignore                        # Git ignore rules (env, node_modules, build, logs)
├── .prettierrc                       # Prettier configuration for formatting
├── package-lock.json                 # Lockfile for reproducible installs
├── package.json                      # Project metadata and dependencies
├── README.md                         # Project documentation
├── tsconfig.json                     # TypeScript configuration
```

## 🚀 Getting Started

To run this bot locally:

```bash
# Clone the repository
git clone https://github.com/nahuel-70/discord-bot-template.git

# Go to the project folder
cd discord-bot-template

# Install dependencies
npm install

# Create your .env file based on .env.example
cp .env.example .env
# Fill in your BOT_TOKEN, CLIENT_ID, GUILD_ID, etc.
```

## ▶️ Running the Bot

- Development mode (recommended while coding):

```bash
npm run dev

# Watches for file changes, auto-compiles TypeScript, and restarts the bot.
```

- Build for production:

```bash
npm run build
```

- Run compiled code (production mode):

```bash
npm start
```

## 🗄️ Optional Database Dependencies

This bot supports multiple databases, but you only need to install the packages for the databases you plan to use. Install them with npm:

```bash
# MongoDB
npm install mongoose

# PostgreSQL
npm install pg

# MySQL
npm install mysql2

# SQLite
npm install sqlite3
```

⚠️ Make sure to update your .env configuration according to the database you want to use.
Only one database connection is needed at a time; the bot will automatically detect which libraries are installed and use the first one available.

## 🤝 Contributions

This project is personal and not open for contributions at the moment,
but feel free to fork or use the structure for your own discord bot.

## 📄 License

This project is licensed under the MIT License — © 2025 Nahuel Gonzalez.

## 🔗 Connect with Me

- GitHub: [nahuel-70](https://github.com/nahuel-70)
- Email: [nahuelgonzalezmartins@gmail.com](mailto:nahuelgonzalezmartins@gmail.com)
- Discord: [@nahuel_70](https://discord.com/users/951189383397113906)
