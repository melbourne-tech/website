import { Link, Outlet } from '@remix-run/react'
import { HomeIcon, MailIcon } from 'lucide-react'
import Footer from '~/components/Footer'

export default function Landing() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between">
        <Link
          to="/"
          className="py-2 px-[13px] m-[3px] flex items-center font-medium justify-center gap-1 text-gray-600 transition-colors duration-200 rounded-sm hover:text-blue-500 focus:outline-none focus-visible:ring"
        >
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/contact"
          className="py-2 px-[13px] m-[3px] flex items-center font-medium justify-center gap-1 text-gray-600 transition-colors duration-200 rounded-sm hover:text-blue-500 focus:outline-none focus-visible:ring"
        >
          <MailIcon className="w-3.5 h-3.5" />
          <span>Contact</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
