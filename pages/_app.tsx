import type { AppPropsWithLayout } from '../lib/types'
import { Inter } from 'next/font/google'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <div
      className={
        'text-base text-text bg-white antialiased h-full ' + inter.className
      }
    >
      {getLayout(<Component {...pageProps} />)}
    </div>
  )
}

export default CustomApp
