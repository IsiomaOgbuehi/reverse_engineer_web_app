import ApiConfig from '../../network/api_config.ts'
import NetworkProvider from '../../network/network_providers/provider/provider.ts'
import * as cheerio from 'cheerio'

const getNonce = async (): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const request = await NetworkProvider.instance.get(
        ApiConfig.getNonce,
        null
      )

      if (request.body !== null) {
        const htmlText = await request.text()
        const $ = cheerio.load(htmlText)

        const nonce = $(`input[name='nonce']`).attr('value') ?? ''
        resolve(nonce)
      } else {
        reject(new Error('No nonce found in the response or request failed.'))
      }
    } catch (err) {
      reject(new Error('Error parsing token from response: ' + err.message))
    }
  })
}

export { getNonce }
