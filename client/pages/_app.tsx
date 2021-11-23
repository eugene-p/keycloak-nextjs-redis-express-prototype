import '@/styles/globals.css'

import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'

import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'

import { Provider } from 'react-redux'
import Store from '@state/store'

interface InitialProps {
  cookies: unknown
  , keycloakConfig: KeycloakConfig
}

const initialOptions: KeycloakInitOptions = {
  checkLoginIframeInterval: 5,
  pkceMethod: 'S256'
}

function MyApp({ Component, pageProps, cookies, keycloakConfig }: AppProps & InitialProps) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakConfig}
      persistor={SSRCookies(cookies)}
      initOptions={initialOptions}
    >
      <Provider store={Store}>
        <Component {...pageProps} />
      </Provider>
    </SSRKeycloakProvider>
  )
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  // Load keycloak config
  return {
    cookies: parseCookies(context?.ctx?.req),
    keycloakConfig: {
      url: process.env.KEYCLOAK_URL || '',
      realm: process.env.KEYCLOAK_REALM || '',
      clientId: process.env.KEYCLOAK_CLIENT_ID || ''
    }
  }
}

export default MyApp
