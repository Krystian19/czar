import path from 'path';
import discord from 'discord.js';
import dotenv from 'dotenv';

import Commands from './commands';
import { Command, spaceRegex } from './types';

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

const client = new discord.Client();
const prefix = '!';

const commandsDict: { [command: string]: Command} = {};
for (const cmd of Commands) {
  commandsDict[cmd.name] = cmd;
}

client.on('ready', () => {
  console.log('Client connected');
});

client.on('disconnect', () => {
  console.log('Client is disconnected');
});

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).split(spaceRegex);
  const commandName = args.shift().toLowerCase();

  const execCommand = commandsDict[commandName];
  if (!execCommand) {
    msg.channel.send(`${commandName} is not a valid command`);
    return;
  }

  try {
    execCommand.execute(msg);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.DISCORD_API_TOKEN)
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
