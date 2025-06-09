import type { ISavedCookie } from "../api_utils/cookies/types.ts/save_cookie"
import type { IUser } from "../api_utils/users/types"
import fs from "node:fs/promises"

class FileUtils {
  private static usersFilePath = "users.json"
  private static cookeiesFilePath = "./src/utils/api_utils/cookies/cookies.json"

  static async createUserList(users: IUser[]): Promise<boolean> {
    try {
      await fs.writeFile(this.usersFilePath, JSON.stringify(users), "utf-8")
      return true
    } catch (error) {
      console.error("Error creating user list:", error)
      return false
    }
  }

  static async updateUserList(user: IUser): Promise<boolean> {
    try {
      const savedJson = await fs.readFile(this.usersFilePath, "utf-8")
      const parsedJson: IUser[] = JSON.parse(savedJson)

      parsedJson.push(user)
      await fs.writeFile(
        this.usersFilePath,
        JSON.stringify(parsedJson),
        "utf-8"
      )
      return true
    } catch (error) {
      console.error("Error updating user list:", error)
      return false
    }
  }

  // Save and Fetch cookies to a file
  static async saveCookies(cookies: ISavedCookie): Promise<boolean> {
    try {
      await fs.writeFile(
        this.cookeiesFilePath,
        JSON.stringify(cookies),
        "utf-8"
      )
      return true
    } catch (error) {
      console.error("Error saving cookies:", error)
      return false
    }
  }

  static async fetchCookies(): Promise<ISavedCookie | null> {
    try {
      return fs
        .access(this.cookeiesFilePath, fs.constants.F_OK)
        .then(async () => {
          const data = await fs.readFile(this.cookeiesFilePath, "utf-8")
          return JSON.parse(data) as ISavedCookie
        })
        .catch(() => {
          return null
        })
    } catch (error) {
      console.error("Error fetching cookies:", error)
      return null
    }
  }
}

export default FileUtils
