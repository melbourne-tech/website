import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr";

export default function createBrowserClient() {
  return createBrowserClientSSR(
    window.ENV.SUPABASE_URL,
    window.ENV.SUPABASE_ANON_KEY,
  );
}
