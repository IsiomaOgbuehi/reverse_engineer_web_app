import type { IUser } from '../api_utils/users/types';
import fs from 'node:fs/promises'

class FileUtils {
   private static filePath = 'users.json'

  static async createUserList(users: IUser[]) {
    try {
        await fs.writeFile(this.filePath, JSON.stringify(users), 'utf-8')
    } catch (error) {
      console.error("Error creating user list:", error)
    }
  }
}

export default FileUtils