const SUPABASE_URL = process.env.SUPABASE_URL!
if (!SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL environment variable')
}

const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!
if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_ANON_KEY environment variable')
}

const RESEND_API_KEY = process.env.RESEND_API_KEY!
if (!RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

export { RESEND_API_KEY, SUPABASE_ANON_KEY, SUPABASE_URL }
