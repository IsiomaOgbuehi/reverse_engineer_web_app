import type { ITokenPayload } from "./types.ts"
import NetworkProvider from '../../network/network_providers/provider/provider.ts'
import * as cheerio from 'cheerio'
import ApiConfig from '../../network/api_config.ts'

const getToken = (): Promise<ITokenPayload> => {
  let token: ITokenPayload = {
    access_token: "",
    openId: "",
    userId: "",
    apiuser: "",
    operateId: "",
    language: "",
  }

  return new Promise(async (resolve, reject) => {
    try {
      const request = await NetworkProvider.instance.get(
        ApiConfig.getTokens,
        null
      )
      if (request.ok && request.body !== null) {
        const responseText = await request.text()

        const $ = cheerio.load(responseText)
        token = {
          access_token: $(`input[id='access_token']`).attr("value") ?? "",
          openId: $(`input[id='openId']`).attr("value") ?? "",
          userId: $(`input[id='userId']`).attr("value") ?? "",
          apiuser: $(`input[id='apiuser']`).attr("value") ?? "",
          operateId: $(`input[id='operateId']`).attr("value") ?? "",
          language: $(`input[id='language']`).attr("value") ?? "",
        }
        resolve(token)
      } else {
        reject(new Error("No token found in the response or request failed."))
      }
    } catch (error) {
      reject(new Error("Error parsing token from response: " + error.message))
    }
  })
}

export { getToken }
