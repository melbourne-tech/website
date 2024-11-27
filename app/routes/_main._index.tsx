import { Link } from '@remix-run/react'
import { CodeIcon, GlobeIcon, CreditCardIcon, PhoneIcon } from 'lucide-react'

const projects = [
  {
    name: 'Side Domains',
    description: 'A toolkit for managing your side project domains',
    url: 'https://side.domains/',
    icon: <GlobeIcon className="w-6 h-6" />,
  },
  {
    name: 'App Starter',
    description: 'React Native/Expo and Supabase starter kit boilerplate',
    url: '/starter',
    icon: <CodeIcon className="w-6 h-6" />,
  },
  {
    name: 'Churner',
    description:
      'Compare credit card welcome bonuses for Australian credit cards',
    url: 'https://www.churner.com.au/',
    icon: <CreditCardIcon className="w-6 h-6" />,
  },
  {
    name: 'Gin Rummy Score Tracker',
    description:
      'iOS and Android app for tracking scores in the gin rummy card game',
    url: '#',
    icon: <PhoneIcon className="w-6 h-6" />,
  },
]

const techStack = [
  'React/React Native',
  'Remix',
  'Supabase',
  'Tailwind CSS',
  'TypeScript',
  'Node.js',
  'GraphQL',
  'PostgreSQL',
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-mono relative">
      <div className="absolute inset-0 bg-graph-paper opacity-5"></div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-200 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
            }}
          ></div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <section className="mb-16 p-6 bg-white border-2 border-gray-800 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-graph-paper opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Melbourne Tech
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Building the future, one line at a time
            </p>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Introducing App Starter
            </h2>
            <p className="text-gray-600 mb-4">
              Jumpstart your mobile app development with our React Native/Expo
              and Supabase starter kit boilerplate.
            </p>
            <Link
              to="/starter"
              className="inline-block bg-gray-800 text-white py-2 px-4 rounded font-semibold hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Get Started
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 border-l-2 border-b-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-t-2 border-r-2 border-gray-400"></div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4 border-l-4 border-gray-600">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <a
                key={project.name}
                href={project.url}
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out border border-gray-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-graph-paper opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div
                  className={`absolute ${index % 2 === 0 ? 'top-0 right-0' : 'bottom-0 left-0'} w-16 h-16 bg-gray-100 ${index % 2 === 0 ? 'rounded-bl-full' : 'rounded-tr-full'}`}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mr-3 group-hover:bg-gray-300 transition-colors duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <div
                  className={`absolute ${index % 2 === 0 ? 'bottom-0 left-0' : 'top-0 right-0'} w-16 h-16 border-t-2 border-r-2 border-gray-300 ${index % 2 === 0 ? 'rounded-tr-full' : 'rounded-bl-full'}`}
                ></div>
              </a>
            ))}
          </div>
        </section>

        {/* Our Stack Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4 border-l-4 border-gray-600">
            Our Stack
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-gray-100 opacity-20"></div>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
              {techStack.map((tech, index) => (
                <li key={tech} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <span className="text-gray-800">{tech}</span>
                </li>
              ))}
            </ul>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border-2 border-gray-300 rounded-full"></div>
          </div>
        </section>
      </div>
    </div>
  )
}
