declare global {
  interface Window {
    ENV: WindowEnv
  }

  interface WindowEnv {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
  }
}

export {}
