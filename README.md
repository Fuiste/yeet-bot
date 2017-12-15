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

Prices out the top 10 cryptocurrencies, you can get more specific info on a currency by specifying a name, for example:

**Examples:**

```
!yeet crypto
!yeet crypto bitcoin
```

# API

## `/status`

Returns `OK` if the server is running.

# Develop

To run the bot locally, make sure DISCORD_TOKEN is in your path, then run:

```bash
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