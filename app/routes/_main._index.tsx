import type { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'
import { AndroidIcon, AppleIcon } from '~/components/Icons'
import { ProjectCard, type Project } from '~/components/ProjectCard'

export const meta: MetaFunction = () => {
  return [
    { title: 'Melbourne Tech' },
    { name: 'description', content: 'Melbourne Tech' },
  ]
}

const projects: Project[] = [
  {
    name: 'App Boilerplate',
    status: 'upcoming',
    description: 'An Expo and Supabase starter kit boilerplate',
  },
  {
    name: 'side.domains',
    status: 'active',
    description: 'A toolkit for managing your side project domains',
    url: 'https://side.domains/',
  },
  {
    name: 'Gin Rummy Score Tracker',
    status: 'active',
    description:
      'iOS and Android app for tracking scores in the gin rummy card game',
    url: [
      {
        url: 'https://apps.apple.com/us/app/gin-rummy-score-tracker/id1620676041',
        label: 'iOS',
        icon: AppleIcon,
      },
      {
        url: 'https://play.google.com/store/apps/details?id=com.melbournetech.ginrummyscoring',
        label: 'Android',
        icon: AndroidIcon,
      },
    ],
  },
  {
    name: 'Credit Card Churner Australia',
    status: 'active',
    description:
      'Compares Credit Card Welcome Bonuses for australian credit cards',
    url: 'https://www.churner.com.au/',
  },
]

export default function Index() {
  return (
    <div className="flex flex-col flex-1">
      <section className="w-full max-w-6xl px-4 mx-auto my-8 sm:my-12 md:my-16">
        <h1
          className="font-bold leading-normal"
          style={{ fontSize: 'clamp(2rem, 9vw, 5rem)' }}
        >
          Melbourne Tech
        </h1>

        <div className="flex flex-col gap-4 mb-14">
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            30 N Gould St Ste 6707
            <br />
            Sheridan, WY 82801
          </h2>
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            <a href="tel:+13072781445">+1 (307) 278-1445</a>
          </h2>
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            <Link to="contact">support@melbournetech.com</Link>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Our Projects</h2>
          <div className="flex flex-col divide-y">
            {projects.map((project) => (
              <div key={project.name} className="py-2">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
