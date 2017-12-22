import { Api, ApiHeader } from './api'

const TEST = 'https://discordapp.com/api/webhooks/393806710172680204/THEF6hEiVh6-y9oA6oWmpqFWOzCes6XVkYO7hvazf3ipHaSPT09BoB7X0vlg2Jh_ixfS/github'
const api = new Api('', true)
const GITHUB_HEADERS = [
  'User-Agent',
  'X-Github-Delivery',
  'X-Github-Event',
  'X-Hub-Signature'
]

export async function testHook(body: any, rawHeaders: string[]) {
  let headers: ApiHeader[] = []
  for (let i = 0; i < rawHeaders.length; i += 2) {
    if (GITHUB_HEADERS.indexOf(rawHeaders[i]) != -1) {
      headers.push({
        key: rawHeaders[i],
        value: rawHeaders[i + 1]
      })
    }
  }
  try {
    let res = await api.post(TEST, body, headers)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}