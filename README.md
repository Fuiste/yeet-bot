# Yeet Bot

This bot's avatar is a dabbing Hatsune Miku and that should tell you all you need to know about how useful it is.

To add it to your channel, go [here](https://discordapp.com/oauth2/authorize?&client_id=390535530800218115&scope=bot&permissions=0).

This bot also runs an Express API for some simple admin controls

# Usage 

## Commands

All commands are prefixed with `!yeet`

### say

Says a thing

**Example:**

```
!yeet say Vsauce, Bichael here!
```

### crypto

Prices out the top 10 cryptocurrencies, you can get more specific info on a currency by specifying a name.

```
!yeet crypto
!yeet crypto dogecoin
```

### game

Sets the bot's game.

```
!yeet game Danza 2: Electric Boogaloo
```

### learn

Learns a phrase and response for the next 24 hours.  The trigger phrase will be the first quoted string and the response will be the second.

```
!yeet learn "Is this real life?", "I'm 12 and very scared"
```

### meme

Either posts or learns a meme from the vault, with credit to the original submitter.

**Note:** Memes _must_ be URL's at the moment

```
!yeet meme
!yeet meme http://www.dankmemes.com/pepe.jpg
```

### nick

Change the bot's nickname on a given server.  You _need_ to give it the right permissions for this to work.

```
!yeet nick Bichael Thurston IV
```

### yell

Like say, but with text to speech.

```
!yeet yell Say that to my face not online see what happens
```

# API

## `/status`

Returns `OK` if the server is running.

# Develop

To run the bot locally, make sure DISCORD_TOKEN is in your path, then run:

```bash
brew install redis
redis-server &
git clone git@github.com:Fuiste/yeet-bot.git
cd yeet-bot
npm install
npm run build
npm run start
```

That's it, you're up and running on $PORT (default 3000)

# Donate

Like this bot?  Donate some Vertcoin to:

```
VmSwZoY2xRVecWUhGvWmH5UrnTH1PDX8cB
```