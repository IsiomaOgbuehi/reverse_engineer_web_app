class ApiConfig {
    /**
        Endpoints uses format: httpRequestMethod + urlAction
    */
  private constructor() {}

  private static apiCookies: string = ''
  private static cookieExpires: Date | null = null

  static BASE_URL = "https://challenge.sunvoy.com"
  static TIMEOUT = 60000 // in milliseconds

  static getNonce: string = `${this.BASE_URL}/login`
  static postLogin: string = `${this.BASE_URL}/login`
  static postLoginUser: string = `https://api.challenge.sunvoy.com/api/settings`
  static getTokens: string = `${this.BASE_URL}/settings/tokens`
  static getUsersList: string = `${this.BASE_URL}/api/users`

  static setCookies(cookies: string): void {
    this.apiCookies = cookies
  }

  static getCookies(): string {
    return this.apiCookies
  }

  static setCookieExpires(date: Date): void {
    this.cookieExpires = date;
  }

  static getCookieExpires(): Date {
    return this.cookieExpires!;
  }
}

export default ApiConfig;