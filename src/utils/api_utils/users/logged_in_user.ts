import ApiConfig from '../../network/api_config.ts'
import NetworkProvider from '../../network/network_providers/provider/provider.ts'
import type { ITokenPayload } from "../token/types.ts"
import getCheckCode from './helper_functions.ts/check_code.ts'

const getLoggedInUser = async (tokens: ITokenPayload): Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      tokens.timestamp = Math.floor(Date.now() / 1e3).toString()
      const checkcode = await getCheckCode(tokens)

      const urlParams = new URLSearchParams()

      Object.keys(tokens)
        .sort()
        .map((key) => urlParams.append(key, encodeURIComponent(tokens[key])))
        .join("&")

      urlParams.append("checkcode", encodeURIComponent(checkcode))
      console.log("URL Params:", urlParams.toString())

      const response = await NetworkProvider.instance.post(
        ApiConfig.postLoginUser,
        urlParams
      )

      if (!response.ok) {
        reject(
          new Error(
            "Failed to fetch logged-in user data: " + response.statusText
          )
        )
      }

      const userData = await response.json()
      resolve(userData)
    } catch (error) {
      reject(new Error("Error fetching logged-in user data: " + error.message))
    }
  })
}

export { getLoggedInUser }
