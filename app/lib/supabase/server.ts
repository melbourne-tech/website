import {
  createServerClient as createServerClientSSR,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../constants'

export default function createServerClient(request: Request) {
  const headers = new Headers()

  const supabase = createServerClientSSR(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '')
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            'Set-Cookie',
            serializeCookieHeader(name, value, options),
          ),
        )
      },
    },
  })

  return { supabase, headers }
}
