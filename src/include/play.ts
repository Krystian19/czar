import discord from 'discord.js';
import ytdl from 'ytdl-core-discord';

import { Song } from '../common';

const play = async (
  song: Song,
  voiceConnection: discord.VoiceConnection,
): Promise<void> => {
  try {
    const stream = await ytdl(song.url, { highWaterMark: 1 << 25 });

    voiceConnection
      .play(stream, { type: 'opus' })
      .on('error', (err) => {
        throw err;
      });
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

export default play;
