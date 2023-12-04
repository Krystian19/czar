# czar

[![Build Status](https://github.com/Krystian19/czar/workflows/build/badge.svg)](https://github.com/Krystian19/czar/actions)

Czar is a Discord DJ Bot tailored to your gaming needs. Connects to the Youtube API to fetch the right tune to accompany your gaming session.

## Requirements

```sh
docker -v
  Docker version 20.10.2 # Or later
```

## Getting started

Authorize czar with access to your designated discord server:

[Bot Authorization Link](https://discordapp.com/oauth2/authorize?client_id=797110597565153280&scope=bot)

And run the container, with the appropiate tokens:

```sh
docker run -ti -d \
  -e DISCORD_API_TOKEN=<YOUR_DISCORD_TOKEN> \
  -e YOUTUBE_API_KEY=<YOUR_API_KEY> \
  --name=czar krystian19/czar:latest
```

And voilà, the bot should be up and running, in your discord server/s of choice.

## License

Project is released under the terms of the MIT License.
