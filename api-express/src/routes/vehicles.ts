import  express, { Response, Request } from 'express'

var vehicles = express.Router()
import {
    AppEvent
    , triggerEvent
    , VEHICLES_ACTIONS
} from '../eventQueue';
import * as vehiclesData from "../data/vehicles";

import getKeycloak from '../initKeycloak';

const keycloak = getKeycloak()

vehicles
    .get(
        '/'
        , keycloak.protect('api-user')
        , async (_:Request, res:Response) => {
            const vehicles = await vehiclesData.listVehicles()
            res.send(vehicles)

            const event: AppEvent = {
                type: VEHICLES_ACTIONS.LISTED
                , properties: vehicles
            }
            await triggerEvent(event)
        }
    )
    .get(
        '/:id'
        , keycloak.protect('api-user')
        , async (req:Request, res:Response) => {
            const vehicle = await vehiclesData.getVehicle(req.params.id)
            res.send(vehicle)

            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.GET}.${req.params.id}`
                , properties: vehicle
            }
            await triggerEvent(event)
        }
    )
    .post(
        '/'
        , async (req:Request, res:Response) => {
            res.status(501).send('Not implemented')
            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.CREATE}.${req.params.id}`
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
                type: `${VEHICLES_ACTIONS.UPDATE}.${req.params.id}`
                , properties: 'Not implemented'
            }
            await triggerEvent(event)
        }
    )
    .put(
        '/:id/driver/:driverId'
        , async (req, res) => {
            res.status(501).send('Not implemented')

            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.SET_DRIVER}.vehicle.${req.params.id}.driver.${req.params.driverId}`
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
                type: `${VEHICLES_ACTIONS.DELETE}.${req.params.id}`
                , properties: 'Not implemented'
            }
            await triggerEvent(event)
        }
    )

export default vehicles