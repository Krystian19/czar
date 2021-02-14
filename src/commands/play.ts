import ytdl from 'ytdl-core';
import YoutubeAPI from 'simple-youtube-api';

import {
  Command,
  spaceRegex,
  testYoutubeUrl,
  Song,
  resetClientActivity,
} from '../common';
import play from '../include/play';

const playCMD: Command = {
  name: 'play',
  description: 'Plays a song. Accepts text and youtube links',
  execute: async (msg, client): Promise<void> => {
    const { content: messageContent } = msg;
    const { channel } = msg.member.voice;
    const args = messageContent.split(spaceRegex);
    args.shift();

    const songQuery = args.join(' ');

    if (!channel) {
      msg.reply('you are not in a voice channel.').catch(console.error);
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
        msg.reply(err.message).catch(console.error);
        return Promise.reject(err);
      }
    } else {
      try {
        const youtube = new YoutubeAPI(process.env.YOUTUBE_API_KEY);
        const results = await youtube.searchVideos(songQuery, 1, {
          part: 'snippet',
        });

        if (results.length) {
          const songInfo = await ytdl.getInfo(results[0].url);

          song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            duration: Number(songInfo.videoDetails.lengthSeconds),
          };
        }
      } catch (err) {
        msg.reply(err.message).catch(console.error);
        return Promise.reject(err);
      }
    }

    if (!song) {
      msg.channel
        .send('Could not resolve to youtube video')
        .catch(console.error);
      return Promise.resolve();
    }

    msg.channel
      .send(`Playing "${song.title}" ${song.url}`)
      .catch(console.error);

    client.user.setActivity(`"${song.title}"`, { type: 'LISTENING' });

    console.log('===========================================================');
    console.log(song);

    try {
      const botConnection = await channel.join();
      await botConnection.voice.setSelfDeaf(true);

      await play(song, botConnection);

      // Reset bot activity, after song is finished playing
      await resetClientActivity(client);
    } catch (err) {
      msg.reply(err.message).catch(console.error);
      channel.leave();
      return Promise.reject(err);
    }

    return Promise.resolve();
  },
};

export default playCMD;
