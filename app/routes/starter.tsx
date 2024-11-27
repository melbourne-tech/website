import { defer, LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import Footer from '~/components/Footer'
import Header from '~/components/starter/Header'
import createServerClient from '~/lib/supabase/server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = createServerClient(request)

  const user = supabase.auth.getUser()

  return defer({ user }, { headers })
}

export default function StarterLayout() {
  const { user } = useLoaderData<typeof loader>()

  console.log('user:', user)

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
