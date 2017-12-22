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
      if (this.debug) {
        console.log(config.headers)
      }

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
  
  del(endpoint: string, headers?: ApiHeader[]): Promise<any> {
    return this._call(endpoint, {
      method: 'delete',
      headers: headers ? headers : []
    })
  }
  
  get(endpoint: string, headers?: ApiHeader[]): Promise<any> {
    return this._call(endpoint, {
      method: 'get',
      headers: headers ? headers : []
    })
  }
  
  post(endpoint: string, body: any, headers?: ApiHeader[]): Promise<any> {
    return this._call(endpoint, {
      method: 'post',
      body: body,
      headers: headers ? headers : []
    })
  }
  
  patch(endpoint: string, body: any, headers?: ApiHeader[]): Promise<any> {
    return this._call(endpoint, {
      method: 'patch',
      body: body,
      headers: headers ? headers : []
    })
  }
}