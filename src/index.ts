import path from 'path';
import discord from 'discord.js';
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const client = new discord.Client();

client.on('ready', () => {
  console.log('We are connected')
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});

client.login(process.env.DISCORD_API_TOKEN)
  .catch(err => {
    console.log(err)
    process.exit(1)
  });
