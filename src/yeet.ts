import * as Express from 'express'

import { client } from './client'
import { DISCORD_TOKEN, PORT } from './environment'

// Set up a webserver for monitoring
const app = Express();
const router = Express.Router()

app.disable('x-powered-by')

router.get('/status', (_, res) => {
  // Health check
  res.status(200)
  res.contentType('text/plain')
  res.send("OK")
})

router.post('/webhook', (req, res) => {
  console.log(req.body)
  res.status(200)
  res.contentType('text/plain')
  res.send('OK')
})

app.use('/', router)

app.listen(PORT, () => {
  console.log("Yeet server is running :)")
  client.login(DISCORD_TOKEN)
})