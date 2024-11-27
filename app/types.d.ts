declare global {
  interface Window {
    ENV: WindowEnv
  }

  interface WindowEnv {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
    CLOUDFLARE_TURNSTILE_SITE_KEY: string
  }
}

export {}
