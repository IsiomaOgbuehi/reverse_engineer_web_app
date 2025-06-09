import NetworkProvider from '../../network/network_providers/provider/provider.ts'
import { getNonce } from './nonce.ts'
import { getLoggedInUser } from '../users/logged_in_user.ts'
import { getToken } from '../token/token.ts'
import type { ITokenPayload } from '../token/types.ts'
import ApiConfig from '../../network/api_config.ts'
import getAllUsers from '../users/get_all_users.ts'
import FileUtils from '../../file_utils/file_utils.ts'
import { setCookies } from '../cookies/set_cookies.ts'

async function getUsers(): Promise<void> {
  const cookieData = await FileUtils.fetchCookies()
  if (cookieData !== null && new Date(cookieData.expires) > new Date()) {
    await ApiConfig.setCookies()

    const token = await getToken()

    const allUsers = await getAllUsers()

    // Save the user list to a file
    const isFileSaved = await FileUtils.createUserList(allUsers)

    if (isFileSaved) {
      const loginUser = await getLoggedInUser(token)
      if (loginUser) {
        // Update user list on file
        const isUserUpdated = await FileUtils.updateUserList(loginUser)
        if (isUserUpdated) {
          console.log('User list updated successfully.')
        }
      }
    }
    return
  }

  const response = await setCookies()
  if (response !== null) {
    loginUser()
  }
}

const loginUser = async (): Promise<ITokenPayload> => {
  return new Promise<ITokenPayload>(async (resolve, reject) => {
    try {
      const nonce = await getNonce()
      const body = new URLSearchParams()
      body.append('nonce', nonce)
      body.append('username', 'demo@example.org')
      body.append('password', 'test')

      const request = await NetworkProvider.instance.post(
        ApiConfig.postLogin,
        body
      )

      if (request.ok) {
        const token = await getToken()

        const allUsers = await getAllUsers()

        // Save the user list to a file
        const isFileSaved = await FileUtils.createUserList(allUsers)

        if (isFileSaved) {
          const loginUser = await getLoggedInUser(token)
          if (loginUser) {
            // Update user list on file
            const isUserUpdated = await FileUtils.updateUserList(loginUser)
            if (isUserUpdated) {
              console.log('User list updated successfully.')
            }
          }
        }
        resolve(token)
      }
    } catch (err) {
      reject(new Error('Error ' + err.message))
    }
  })
}

export { loginUser, getUsers }
