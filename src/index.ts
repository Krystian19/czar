import path from 'path';
import dotenv from 'dotenv';

import client from './client';

// Load env vars before the client's execution
dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

client.login(process.env.DISCORD_API_TOKEN).catch((err) => {
  console.log(err);
  process.exit(1);
});
