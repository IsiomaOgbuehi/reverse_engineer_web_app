import puppeteer from "puppeteer"
import ApiConfig from "../../network/api_config.ts"

const setCookies = async (): Promise<string | null> => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.setUserAgent("Reverse-Engineering/1.0")

    await page.goto(`${ApiConfig.postLogin}`, {
      waitUntil: "networkidle2",
    })

    await page.type('input[name="username"]', "demo@example.org")
    await page.type('input[name="password"]', "test")

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({waitUntil: "networkidle2"})
    ])

    const cookies = await page.browser().cookies() // cookies()

    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ")
    const cookieSession = cookies.find((cookie) => cookie.name === "JSESSIONID")

    if (cookieSession) {
      ApiConfig.setCookies(cookieString)
      ApiConfig.setCookieExpires(new Date(cookieSession.expires * 1000))
    } else {
      throw new Error("JSESSIONID cookie not found")
    }

    await browser.close()
    return cookieString
  } catch (err) {
    console.error("Error in setCookies:", err)
    await (await puppeteer.launch({ headless: true })).close()
    return null
  }
}

export { setCookies }
