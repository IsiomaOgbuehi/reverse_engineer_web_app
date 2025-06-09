import type { IUser } from '../api_utils/users/types';
import fs from 'node:fs/promises'

class FileUtils {
   private static filePath = 'users.json'

  static async createUserList(users: IUser[]): Promise<boolean> {
    try {
        await fs.writeFile(this.filePath, JSON.stringify(users), 'utf-8')
        return true
    } catch (error) {
      console.error("Error creating user list:", error)
      return false
    }
  }

  static async updateUserList(user: IUser): Promise<boolean> {
    try {
        const savedJson = await fs.readFile(this.filePath, 'utf-8')
        const parsedJson: IUser[] = JSON.parse(savedJson)

        parsedJson.push(user)
        await fs.writeFile(this.filePath, JSON.stringify(parsedJson), 'utf-8')
        return true
    } catch(error) {
      console.error("Error updating user list:", error)
      return false
    }
  }
}

export default FileUtils