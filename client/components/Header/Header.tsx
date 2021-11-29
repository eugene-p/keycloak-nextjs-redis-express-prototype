import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import * as React from 'react'
import ButtonComponent from '@components/Button'
import style from './style/Header.module.css'

export const Header: React.FC = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>()

  return (
    <header className={style.header}>
      <section className={style.brand}>Prototype</section>
      <section>
        {keycloak?.authenticated ? (
          <>
            <ButtonComponent
              key="create-account-button"
              type="button"
              buttonType="primary"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createAccountUrl()
                }
              }}
            >
              My Account
            </ButtonComponent>

            <ButtonComponent
              key="logout-button"
              type="button"
              buttonType="danger"
              onClick={() => {
                if (keycloak) {
                  window.location.href = keycloak.createLogoutUrl()
                }
              }}
            >
              Logout
            </ButtonComponent>
          </>
        ) : (<></>)}
      </section>
    </header>
  )
}
