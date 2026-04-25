import { useDelayedScrollSnap } from '../components/useDelayedScrollSnap'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  useDelayedScrollSnap()

  return <Component {...pageProps} />
}

export default MyApp
