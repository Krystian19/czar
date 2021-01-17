import { Command } from '../types';

const playCMD: Command = {
  name: 'play',
  description: 'Play',
  execute: async (msg): Promise<void> => {
    msg.channel.send('Play command works well');
    return Promise.resolve();
  },
};

export default playCMD;
