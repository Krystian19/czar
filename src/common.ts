import discord from 'discord.js';

export const CMD_PREFIX = '!';

export type Command = {
  name: string;
  description: string;
  execute: (msg: discord.Message, client: discord.Client) => Promise<void>;
};

export type Song = {
  title: string;
  url: string;
  duration: number;
};

export const spaceRegex = / +/;

export const testYoutubeUrl = (url: string): boolean => {
  const UrlPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  return UrlPattern.test(url);
};

export const setClientActivity = (
  client: discord.Client,
): Promise<discord.Presence> => client.user.setActivity(
  `Music. Type ${CMD_PREFIX}help for help`,
  { type: 'PLAYING' },
);
