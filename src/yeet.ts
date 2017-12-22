import * as Express from 'express'

import { client } from './client'
import { DISCORD_TOKEN, PORT } from './environment'
import { getRouter } from './router'

// Set up a webserver for monitoring
const app = Express()

app.disable('x-powered-by')
app.use(Express.json())
app.use('/', getRouter())

app.listen(PORT, () => {
  console.log("Yeet server is running :)")
  client.login(DISCORD_TOKEN)
})