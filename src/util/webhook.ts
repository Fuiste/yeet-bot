import { Api } from './api'

const TEST = 'https://discordapp.com/api/webhooks/393806710172680204/THEF6hEiVh6-y9oA6oWmpqFWOzCes6XVkYO7hvazf3ipHaSPT09BoB7X0vlg2Jh_ixfS/github'
const api = new Api('', true)

export async function testHook(body: any, headers: any) {
  console.log(headers)
  try {
    let res = await api.post(TEST, body)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}