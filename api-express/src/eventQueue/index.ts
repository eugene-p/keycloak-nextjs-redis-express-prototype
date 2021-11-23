import { info } from 'console'
import client from '../data/dataClient'

export type AppEvent = {
    type: string
    , properties: any
}

export const VEHICLES_ACTIONS = {
    LISTED: 'vehicles.listed'
    , GET: 'vehicles.get'
    , CREATE: 'vehicles.create'
    , UPDATE: 'vehicles.update'
    , DELETE: 'vehicles.delete'
    , SET_DRIVER: 'vehicles.set_driver'
}

export const DRIVERS_ACTIONS = {
    LISTED: 'drivers.listed'
    , GET: 'drivers.get'
    , CREATE: 'drivers.create'
    , UPDATE: 'drivers.update'
    , DELETE: 'drivers.delete'
}

export const triggerEvent = async (evt: AppEvent) => {
    const record = { _ts: (new Date()).getTime(), ...evt }
    client.publish(
        record.type,
        JSON.stringify(record)
    )

    info(`event sent: ${JSON.stringify(record)}`);
}
