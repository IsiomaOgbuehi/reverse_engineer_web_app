import ApiConfig from '../../network/api_config.ts'
import NetworkProvider from '../../network/network_providers/provider/provider.ts'
import type { IUser } from './types.ts'

const getAllUsers = async (): Promise<IUser[]> => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await NetworkProvider.instance.post(
        ApiConfig.getUsersList,
        null
      )

      if (!response.ok) {
        reject(
          new Error(
            "Failed to fetch logged-in user data: " + response.statusText
          )
        )
      }

      const userData: IUser[] = await response.json()
      console.log("All users fetched:", userData[0].firstName)
      resolve(userData)
    } catch (error) {
      reject(new Error("Error fetching logged-in user data: " + error.message))
    }
  })
}

export default getAllUsers