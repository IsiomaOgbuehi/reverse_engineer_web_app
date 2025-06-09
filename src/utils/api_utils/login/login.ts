import NetworkProvider from "../../network/network_providers/provider/provider.ts"
import { getNonce } from './nonce.ts'
import { getLoggedInUser } from '../users/logged_in_user.ts'
import { getToken } from '../token/token.ts'
import type { ITokenPayload } from "../token/types.ts"
import ApiConfig from '../../network/api_config.ts'
import getAllUsers from '../users/get_all_users.ts'
import FileUtils from '../../file_utils/file_utils.ts'

const loginUser = async (): Promise<ITokenPayload> => {
  return new Promise<ITokenPayload>(async (resolve, reject) => {
    try {
      const nonce = await getNonce()
      const body = new URLSearchParams()
      body.append("nonce", nonce)
      body.append("username", "demo@example.org")
      body.append("password", "test")
      console.log("Body:", body.toString())

      const request = await NetworkProvider.instance.post(
        ApiConfig.postLogin,
        body
      )

      if (request.ok) {
        console.log("Login successful")
        const token = await getToken()
        console.log("Token:", token)
        const allUsers = await getAllUsers()
        console.log("All users fetched:", allUsers)
        FileUtils.createUserList(allUsers)
        // if(res) {
        // getLoggedInUser(token)
        // }
        resolve(token)
      }
    } catch (err) {
      reject(new Error("Error " + err.message))
    }
  })
}

export { loginUser }
