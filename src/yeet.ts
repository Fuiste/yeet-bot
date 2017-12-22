import * as Express from 'express'

import { client } from './client'
import { DISCORD_TOKEN, PORT } from './environment'

// Set up a webserver for monitoring
const app = Express();

app.disable('x-powered-by')
app.use(Express.json)

app.all('*', (req, res) => {
  if (req.url === '/status') {
    // Health check
    res.status(200)
    res.contentType('text/plain')
    res.send("OK")
  }

  if (req.url === '/webhook') {
    console.log(req.body)
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