import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from '../lib/types'

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col flex-1">
      <Head>
        <title>Melbourne Tech</title>
        <meta name="description" content="Melbourne Tech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full max-w-6xl px-4 mx-auto my-8 sm:my-12 md:my-16">
        <h1
          className="font-bold leading-normal"
          style={{ fontSize: 'clamp(2rem, 9vw, 5rem)' }}
        >
          Melbourne Tech
        </h1>

        <div className="flex flex-col gap-4">
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            30 N Gould St Ste 6707
            <br />
            Sheridan, WY 82801
          </h2>
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            <a href="tel:+13072781445">+1 (307) 278-1445</a>
          </h2>
          <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
            <Link href="/contact">support@melbournetech.com</Link>
          </h2>
        </div>
      </section>
    </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
