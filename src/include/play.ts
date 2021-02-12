import discord from 'discord.js';
import ytdl from 'ytdl-core-discord';

import { Song } from '../common';

const play = async (
  song: Song,
  voiceConnection: discord.VoiceConnection,
): Promise<void> => {
  let stream;
  try {
    stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
  } catch (err) {
    return Promise.reject(err);
  }

  return new Promise((resolve, reject) => {
    voiceConnection
      .play(stream, { type: 'opus' })
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        resolve();
      });
  });
};

export default play;
