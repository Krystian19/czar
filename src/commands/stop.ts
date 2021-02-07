import { Command } from '../common';

const stopCMD: Command = {
  name: 'stop',
  description: 'Stop',
  execute: async (msg): Promise<void> => {
    const { channel } = msg.member.voice;
    channel.leave();
  },
};

export default stopCMD;
