import '@/styles/globals.css'

import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'

import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr'
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'

const keycloakCfg: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'freshworks-demo',
  clientId: 'demo-app'
}

interface InitialProps {
  cookies: unknown
}

const initialOptions: KeycloakInitOptions = {
  checkLoginIframeInterval: 5,
  pkceMethod: 'S256'
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      initOptions={initialOptions}
    >
      <Component {...pageProps} />
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
  return {
    cookies: parseCookies(context?.ctx?.req),
  }
}

export default MyApp
