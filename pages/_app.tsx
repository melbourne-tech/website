import type { AppPropsWithLayout } from '../lib/types'
import '../styles/global.css'

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default CustomApp
