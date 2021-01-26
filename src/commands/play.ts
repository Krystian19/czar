import ytdl from 'ytdl-core';

import {
  Command, spaceRegex, testYoutubeUrl, Song,
} from '../common';
import play from '../include/play';

const playCMD: Command = {
  name: 'play',
  description: 'Play',
  execute: async (msg, client): Promise<void> => {
    const { content: messageContent } = msg;
    const { channel } = msg.member.voice;
    const args = messageContent.split(spaceRegex);
    args.shift();

    const songQuery = args.join(' ');

    if (!channel) {
      msg.reply('Not in a channel').catch(console.error);
      return Promise.resolve();
    }

    const permissions = channel.permissionsFor(msg.client.user);

    if (!permissions.has('CONNECT')) {
      const errMsg = 'No connection permission';
      msg.reply(errMsg).catch(console.error);
      return Promise.reject(errMsg);
    }

    if (!permissions.has('SPEAK')) {
      const errMsg = 'No permission to speak';
      msg.reply(errMsg).catch(console.error);
      return Promise.reject(errMsg);
    }

    let song: Song = null;

    if (testYoutubeUrl(songQuery)) {
      try {
        const songInfo = await ytdl.getInfo(songQuery);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: Number(songInfo.videoDetails.lengthSeconds),
        };
      } catch (err) {
        msg.reply(err.message);
        return Promise.reject(err);
      }

      msg.channel.send(`Playing "${song.title}"`).catch(console.error);
      client.user.setActivity(
        `"${song.title}"`,
        { type: 'LISTENING' },
      );

      console.log('===========================================================');
      console.log(song);

      try {
        const botConnection = await channel.join();
        await botConnection.voice.setSelfDeaf(true);

        await play(song, botConnection);
      } catch (err) {
        msg.reply(err.message);
        await channel.leave();
        msg.channel.send('Could not join channel').catch(console.error);
        return Promise.reject(err);
      }

      return Promise.resolve();
    }

    msg.channel.send('Not a valid Youtube URL').catch(console.error);
    return Promise.resolve();
  },
};

export default playCMD;
