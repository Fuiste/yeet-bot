import * as Express from 'express'

import { client } from './client'
import { DISCORD_TOKEN, PORT } from './environment'
import { testHook } from './util/webhook'

// Set up a webserver for monitoring
const app = Express()
const router = Express.Router()

router.get('/status', (_, res) => {
  // Health check
  res.status(200)
  res.contentType('text/plain')
  res.send("OK")
})
  
router.post('/webhook', (req, res) => {
  testHook(req.body)
  res.status(200)
  res.contentType('text/plain')
  res.send('OK')
})

app.disable('x-powered-by')
app.use(Express.json())
app.use('/', router)

app.listen(PORT, () => {
  console.log("Yeet server is running :)")
  client.login(DISCORD_TOKEN)
})