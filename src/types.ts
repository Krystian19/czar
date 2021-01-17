import discord from 'discord.js';

export type Command = {
  name: string;
  description: string;
  execute: (msg: discord.Message) => Promise<void>;
};

export const spaceRegex = / +/;
