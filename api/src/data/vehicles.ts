import { VehicleFeature, VehicleFeatureCollection } from '../models';
import client from './dataClient';

const getVehicleById = async (id:string): Promise<VehicleFeature> => {
    const props = JSON.parse(await client.get(`fleet:${id}:props`) || '')
    const status =  JSON.parse(await client.get(`fleet:${id}:status`) || '')
    const location = (await client.geoPos('fleet', id))[0]

    const feature: VehicleFeature = {
        type: 'Feature'
        , properties: {
            id:id
            , name: props.name
            ,type: props.type
            , state: {
                speed: status.speed
                , direction: status.direction
                , timestamp: status.timestamp
            }
            , driver: {
                name: 'Eugene'
            }
        }
        , geometry: {
            type: 'Point',
            coordinates: [
                parseFloat(location?.longitude || '0')
                , parseFloat(location?.latitude || '0')
            ]
        }
    }

    return feature
}

export const getVehicle = async (vehicleId: string):Promise<VehicleFeature | null> => await getVehicleById(vehicleId)

export const listVehicles = async (): Promise<(VehicleFeatureCollection | {})> => {
    try {
        const vehicles  = (await client.keys('fleet:*:props'))
            .map(item => item.replace(/fleet:(.*):props/, '$1'))
            .map(async (vehicleId) => await getVehicleById(vehicleId))

        const collection: VehicleFeatureCollection = {
            type:'FeatureCollection'
            , features: await Promise.all(vehicles)
        }

        return collection
    } catch (error) {
        return {}
    }
}
