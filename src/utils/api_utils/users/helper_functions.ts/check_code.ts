import type { ITokenPayload } from '../../token/types.ts'
const { createHmac } = await import('crypto')

const getCheckCode = async (tokens: ITokenPayload): Promise<string> => {
  let checkcode = ''
  try {
    const timestamp = Math.floor(Date.now() / 1e3).toString()
    const tokenValues = { ...tokens, timestamp: tokens.timestamp ?? timestamp }

    const message = Object.keys(tokenValues)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(tokenValues[key])}`)
      .join('&')

    const hash = createHmac('sha1', 'mys3cr3t')
    hash.update(message)
    checkcode = hash.digest('hex').toUpperCase()
  } catch (err) {
    console.error('crypto support is disabled!')
  }
  return checkcode
}

export default getCheckCode
