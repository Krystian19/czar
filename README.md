# czar

[![Build Status](https://github.com/Krystian19/czar/workflows/build/badge.svg)](https://github.com/Krystian19/czar/actions)

Czar is a Discord DJ Bot tailored to your gaming needs. Connects to the Youtube API to fetch the right tune to accompany your gaming session.

## Requirements
```sh
docker -v
  Docker version 18.03.0-ce # Or later.
```

## Getting started

Make your local copy of the env file, and set your API keys:
```sh
copy .env_example .env
```

And build your image and run container:
```sh
# Build your image
docker build -t krystian19/czar -f Dockerfile.dev .

# Run on a container
docker run -ti -d --env-file=.env --name=czar krystian19/czar
```

And voilà, the bot should be up and running.