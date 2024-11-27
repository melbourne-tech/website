import { NavLink } from '@remix-run/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `font-medium px-4 py-3 md:py-2 block md:inline-block transition-colors duration-200 ${
      isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
    }`

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="flex flex-col">
            <span className="font-medium text-gray-900">App Starter</span>
            <span className="text-xs text-gray-600">by Melbourne Tech</span>
          </NavLink>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={toggleMenu}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              <li>
                <NavLink to="/" className={linkClass} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/#pricing" className={linkClass}>
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink to="/docs/introduction" className={linkClass}>
                  Docs
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-in" className={linkClass}>
                  Sign In
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out z-10`}
      >
        <ul className="py-2">
          <li>
            <NavLink to="/" className={linkClass} end onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/#pricing" className={linkClass} onClick={toggleMenu}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/docs/introduction"
              className={linkClass}
              onClick={toggleMenu}
            >
              Docs
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-in" className={linkClass} onClick={toggleMenu}>
              Sign In
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
