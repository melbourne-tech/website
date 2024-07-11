import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { HomeIcon, MailIcon } from '@heroicons/react/outline'

const currentYear = new Date().getFullYear()

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between">
        <Link
          href="/"
          className="py-2 px-[13px] m-[3px] flex items-center font-medium justify-center gap-1 text-gray-600 transition-colors duration-200 rounded-sm hover:text-blue-500 focus:outline-none focus-visible:ring"
        >
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/contact"
          className="py-2 px-[13px] m-[3px] flex items-center font-medium justify-center gap-1 text-gray-600 transition-colors duration-200 rounded-sm hover:text-blue-500 focus:outline-none focus-visible:ring"
        >
          <MailIcon className="w-3.5 h-3.5" />
          <span>Contact</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="flex-shrink-0 px-4 py-3 border-t-2 border-gray-100 flex flex-row justify-between items-center">
        <div>&copy; Melbourne Tech, LLC {currentYear}</div>

        <div className="flex space-x-3">
          <a
            title="GitHub (@melbourne-tech)"
            href="https://github.com/melbourne-tech"
            className="text-gray-600 hover:text-[#181717] transition-colors duration-200"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-current"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
