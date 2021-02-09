import discord from 'discord.js';
// import path from 'path';

import Commands from '../commands';
import {
  Command,
  spaceRegex,
  CMD_PREFIX,
  setClientActivity,
} from '../common';

const client = new discord.Client();

const commandsDict: { [command: string]: Command } = {};
for (const cmd of Commands) {
  commandsDict[cmd.name] = cmd;
}

client.on('ready', () => {
  console.log('Client ready');
  setClientActivity(client).catch(console.error);

  // Can't change of avatar very often without being throttled, be careful.
  // client.user
  //   .setAvatar(path.resolve(__dirname, 'pp.png'))
  //   .catch(console.error);
});

client.on('warn', (info) => console.log(info));
client.on('error', console.error);

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(CMD_PREFIX)) return;

  const args = msg.content.slice(CMD_PREFIX.length).split(spaceRegex);
  const commandName = args.shift().toLowerCase();

  const execCommand = commandsDict[commandName];
  if (!execCommand) {
    msg.channel.send(`${commandName} is not a valid command`);
    return;
  }

  try {
    execCommand.execute(msg, client);
  } catch (err) {
    console.error(err);
  }
});

export default client;
