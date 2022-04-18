import '../styles/globals.css'
import '../styles/styles.css'
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
