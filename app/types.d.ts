declare global {
  interface Window {
    ENV: WindowEnv
  }

  interface WindowEnv {
    CLOUDFLARE_TURNSTILE_SITE_KEY: string
  }
}

export {}
