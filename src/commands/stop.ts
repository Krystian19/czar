import { Command, setClientActivity } from '../common';

const stopCMD: Command = {
  name: 'stop',
  description: 'Stop',
  execute: async (msg, client): Promise<void> => {
    const { channel } = msg.member.voice;
    channel.leave();

    try {
      await setClientActivity(client);
    } catch (err) {
      return Promise.reject(err);
    }

    return Promise.resolve();
  },
};

export default stopCMD;
