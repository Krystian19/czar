import { Command } from '../common';

const authorCMD: Command = {
  name: 'author',
  description: 'Shows who you should give thanks to 😉',
  execute: async (msg): Promise<void> => {
    const { channel } = msg;

    channel
      .send('Jan Guzman (Krystian19) - https://github.com/Krystian19')
      .catch(console.error);
  },
};

export default authorCMD;
