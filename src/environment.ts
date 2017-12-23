export const COMMIT_WEBHOOK = process.env.COMMIT_WEBHOOK || 'https://discordapp.com/api/webhooks/not-a-real-webhook/github'
export const DEBUG = process.env.DEBUG ? true : false
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'dev'
export const PORT = process.env.PORT || 3000
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'