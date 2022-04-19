import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/styles-g10.css'
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
