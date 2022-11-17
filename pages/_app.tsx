//@ts-nocheck
import "../styles/globals.css";
import "../styles/styles-g10.css";
import "../styles/carbon-components.css";

import { NotificationsProvider } from "@mantine/notifications";
import { withBlitz } from "app/blitz-client";
import { Suspense } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NotificationsProvider>
        <Suspense fallback="loading...">
          <Component {...pageProps} />
        </Suspense>
      </NotificationsProvider>
    </>
  );
}

export default withBlitz(MyApp);
