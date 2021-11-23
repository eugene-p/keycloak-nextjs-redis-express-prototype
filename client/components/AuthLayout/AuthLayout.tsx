import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import ButtonComponent from '@components/Button'


import React, { FC } from 'react'
import Layout, {LayoutProps} from '@components/Layout'
import Header from '@components/Header'
import Footer from '@components/Footer'

import styles from './style/AuthLayout.module.css'



const AuthLayout: FC<LayoutProps> = ({children, title}) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const content = keycloak?.authenticated ? (
    <Layout title={title}>{children}</Layout>
  ) : (
    <>
      <Header />
      <div className={styles.main}>
      <ButtonComponent
        key="register-button"
        type="button"
        buttonType="primary"
        onClick={() => {
          if (keycloak) {
            window.location.href = keycloak.createRegisterUrl()
          }
        }}
      >Create Account</ButtonComponent>
      <ButtonComponent
        key="login-button"
        type="button"
        buttonType="success"
        onClick={() => {
          if (keycloak) {
            window.location.href = keycloak.createLoginUrl()
          }
        }}
      >Login</ButtonComponent>
      </div>
      <Footer />
    </>
  )

  return content
};

export default AuthLayout;