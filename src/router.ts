import * as Express from 'express'

import { testHook } from './util/webhook'

export function getRouter(): Express.Router {
  let router = Express.Router()

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

  return router
}
