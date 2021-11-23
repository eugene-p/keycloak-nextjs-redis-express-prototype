import KeycloakConnect from 'keycloak-connect'
import session from 'express-session'
import KeycloakConfig from './keycloak.js'

let keycloak: KeycloakConnect.Keycloak

export const memoryStore =  new session.MemoryStore()

const initKeycloak = () => {
    if (!keycloak) {
        keycloak = new KeycloakConnect({
            store: memoryStore
        }, KeycloakConfig)
    }

    return keycloak
}

export default initKeycloak