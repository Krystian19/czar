import { Command, CMD_PREFIX } from '../common';

import commands from './index';

const helpCMD: Command = {
  name: 'help',
  description: 'Shows the available commands',
  execute: async (msg): Promise<void> => {
    let response = "Here's how you can use the DJ bot";

    commands.forEach((cmd) => {
      response += `\n ${CMD_PREFIX}${cmd.name} **${cmd.description}**`;
    });

    msg.reply(response).catch(console.error);
  },
};

export default helpCMD;
