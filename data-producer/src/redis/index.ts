import { createClient } from 'redis';
import { Position } from "geojson";
import { featureProperties, featureStatus } from '../filereader/helpers';
import { info } from 'console';

const client = createClient(
    {
        socket: {
            port: parseInt(process.env.REDIS_PORT, 10)
        }
    }
);

client.connect();

export const saveDatapoint = async (
    vehicleId: string
    , position: Position
    , status: featureStatus
    , props: featureProperties
) => {
    await client.geoAdd('fleet', {
        latitude: position[1]
        , longitude: position[0]
        , member: `${vehicleId}`
    })

    await client.set(`fleet:${vehicleId}:status`, JSON.stringify(status))
    await client.set(`fleet:${vehicleId}:props`, JSON.stringify(props))

    info("Data pushed")
}

export default client;