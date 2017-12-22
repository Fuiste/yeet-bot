import * as Express from 'express'
import * as bodyParser from 'body-parser'

import { client } from './client'
import { DISCORD_TOKEN, PORT } from './environment'

// Set up a webserver for monitoring
const app = Express();

app.disable('x-powered-by')
app.use(bodyParser.json)

app.all('*', (req, res) => {
  if (req.url === '/status') {
    // Health check
    res.status(200)
    res.contentType('text/plain')
    res.send("OK")
  }

  if (req.url === '/webhook') {
    console.log(req)
    res.status(200)
    res.contentType('text/plain')
    res.send('OK')
  }
})

app.listen(PORT, () => {
  console.log("Yeet server is running :)")

  // Log into Discord
  client.login(DISCORD_TOKEN)
})