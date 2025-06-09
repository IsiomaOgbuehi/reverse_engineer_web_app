import ApiConfig from '../../../api_config.ts'
import { INetworkInterface } from '../../types/network_interface.ts'

class FetchApi implements INetworkInterface<Response> {
  constructor() {}

  async post(url: string, body: BodyInit | null): Promise<Response> {
    try {
      console.log("FetchApi.post", url, body?.toString())
      return fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/x-www-form-urlencoded",
          cookie: ApiConfig.getCookies(),
        },
        body
      }).then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            return Promise.reject(
              new Error("Unauthorized access - please log in again.")
            )
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response
      })
    } catch (err) {
      return Promise.reject(new Error('Error in FetchApi.post:'))
    }
  }

  async get(url: string, body: BodyInit | null): Promise<Response> {
    try {
      return fetch(url, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/x-www-form-urlencoded",
          cookie: ApiConfig.getCookies(),
        },
        body,
      }).then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            return Promise.reject(
              new Error("Unauthorized access - please log in again.")
            )
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response
      })
    } catch (err) {
      return Promise.reject(new Error('Error in FetchApi.post:'))
    }
  }
}

export default FetchApi
