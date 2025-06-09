import type { ISavedCookie } from '../api_utils/cookies/types.ts/save_cookie'
import FileUtils from '../file_utils/file_utils.ts'

class ApiConfig {
    /**
        Endpoints uses format: httpRequestMethod + urlAction
    */
  private constructor() {}

  private static apiCookies: ISavedCookie | null = null
  private static cookieExpires: Date | null = null

  static BASE_URL = "https://challenge.sunvoy.com"
  static TIMEOUT = 60000 // in milliseconds

  static getNonce: string = `${this.BASE_URL}/login`
  static postLogin: string = `${this.BASE_URL}/login`
  static postLoginUser: string = 'https://api.challenge.sunvoy.com/api/settings'
  static getTokens: string = `${this.BASE_URL}/settings/tokens`
  static getUsersList: string = `${this.BASE_URL}/api/users`

  static async setCookies(): Promise<void> {
    const cookies = await FileUtils.fetchCookies()
    if (cookies) {
      this.apiCookies = cookies
      this.cookieExpires = new Date(cookies.expires)
    }
  }

  static getCookies(): string {
    if (!this.apiCookies) {
      return ''
    }
    console.log('GETTING COOKIES FROM API CONFIG', this.apiCookies.cookie)
    return this.apiCookies!.cookie
  }

  static getCookieExpires(): Date | null {
    if (!this.cookieExpires) {
      return null
    }
    return this.cookieExpires;
  }
}

export default ApiConfig;