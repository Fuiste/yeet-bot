import * as request from 'superagent'

export interface ApiHeader {
  key: string;
  value: string;
}

export interface ApiCallConfig {
  method: string;
  body?: any;
  headers?: ApiHeader[];
}

export class Api {
  constructor(public host: string, public debug?: boolean) {if (!debug) {this.debug = false}}

  private async _call(endpoint: any, config: ApiCallConfig): Promise<any> {
    if (this.debug) {
      console.log(`[API] - ${config.method.toUpperCase()} - ${this.host + endpoint}`)
    }

    let req = request(config.method, this.host + endpoint)
    req = req.set("Content-type", "application/json")

    if (config.headers) {
      config.headers.forEach((header) => {
        req.set(header.key, header.value)
      })
    }

    if (config.body) {
      req = req.send(config.body)
    }

    try {
      const res = await req

      if (res.ok) {
        return res.body
      } else {
        throw res.body
      }
    } catch(e) {
      if (e.response && e.response.body) {
        throw e.response.body
      } else {
        throw e
      }
    }
  }
  
  del(endpoint: string): Promise<any> {
    return this._call(endpoint, {
      method: 'delete'
    })
  }
  
  get(endpoint: string): Promise<any> {
    return this._call(endpoint, {
      method: 'get'
    })
  }
  
  post(endpoint: string, body: any): Promise<any> {
    return this._call(endpoint, {
      method: 'post',
      body: body
    })
  }
  
  patch(endpoint: string, body: any): Promise<any> {
    return this._call(endpoint, {
      method: 'patch',
      body: body
    })
  }
}