import { Command, spaceRegex } from '../common';

const playCMD: Command = {
  name: 'play',
  description: 'Play',
  execute: async (msg, client): Promise<void> => {
    const { content: message } = msg;
    const args = message.split(spaceRegex);
    args.shift();

    const songQuery = args.join(' ');
    msg.channel.send(`Playing "${songQuery}"`);
    client.user.setActivity(`"${songQuery}"`, { type: 'LISTENING' });

    return Promise.resolve();
  },
};

export default playCMD;
