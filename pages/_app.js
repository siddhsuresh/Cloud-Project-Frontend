import '../styles/globals.css'
import '../styles/styles-g10.css'
import '../styles/carbon-components.css'

import { NotificationsProvider } from '@mantine/notifications';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </>
  )
}

export default MyApp
