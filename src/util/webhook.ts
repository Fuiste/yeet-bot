import { Api, ApiHeader } from './api'
import { COMMIT_WEBHOOK, DEBUG } from '../environment'

const api = new Api('', DEBUG)
const GITHUB_HEADERS = [
  'User-Agent',
  'X-Github-Delivery',
  'X-Github-Event',
  'X-Hub-Signature'
]

export async function handleGithubWebhook(body: any, rawHeaders: string[]) {
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
    let res = await api.post(COMMIT_WEBHOOK, body, headers)
    console.log(res)
  } catch(e) {
    console.error(e)
  }
}