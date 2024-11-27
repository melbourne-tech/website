import { CLOUDFLARE_TURNSTILE_SECRET_KEY } from './constants'

export async function verifyTurnstileResponse(
  response: string,
  ip: string | null,
) {
  const formData = new FormData()
  formData.append('secret', CLOUDFLARE_TURNSTILE_SECRET_KEY)
  formData.append('response', response)
  if (ip !== null) {
    formData.append('remoteip', ip)
  }

  try {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    const result = await fetch(url, {
      body: formData,
      method: 'POST',
    })

    const outcome = await result.json()
    return outcome.success
  } catch (error) {
    return false
  }
}
