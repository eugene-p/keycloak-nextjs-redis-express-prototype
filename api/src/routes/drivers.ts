import  express, { Response, Request } from 'express'

var drivers = express.Router()
import {
    AppEvent
    , triggerEvent
    , DRIVERS_ACTIONS
} from '../eventQueue';

import getKeycloak from '../initKeycloak';

const keycloak = getKeycloak()

drivers
    .get(
        '/'
        , keycloak.protect('realm:app-user')
        , async (_:Request, res:Response) => {
            res.status(501).send('Not implemented')

            const event: AppEvent = {
                type: DRIVERS_ACTIONS.LISTED
                , properties: "Not implemented"
            }
            await triggerEvent(event)
        }
    )
    .get(
        '/:id'
        , keycloak.protect()
        , async (req:Request, res:Response) => {
            res.status(501).send('Not implemented')

            const event: AppEvent = {
                type: `${DRIVERS_ACTIONS.GET}.${req.params.id}`
                , properties: "Not implemented"
            }
            await triggerEvent(event)
        }
    )
    .post(
        '/'
        , async (req:Request, res:Response) => {
            res.status(501).send('Not implemented')
            const event: AppEvent = {
                type: `${DRIVERS_ACTIONS.CREATE}.${req.params.id}`
                , properties: 'Not implemented'
            }
            await triggerEvent(event)
        }
    )
    .put(
        '/:id'
        , async (req, res) => {
            res.status(501).send('Not implemented')
            const event: AppEvent = {
                type: `${DRIVERS_ACTIONS.UPDATE}.${req.params.id}`
                , properties: 'Not implemented'
            }
            await triggerEvent(event)
        }
    )
    .delete(
        '/:id'
        , async (req, res) => {
            res.status(501).send('Not implemented')
            const event: AppEvent = {
                type: `${DRIVERS_ACTIONS.DELETE}.${req.params.id}`
                , properties: 'Not implemented'
            }
            await triggerEvent(event)
        }
    )

export default drivers