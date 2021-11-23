import * as fs from 'fs';
import * as readline from 'readline';
import * as events from 'events';
import { Feature } from 'geojson';

import {
    parceGeoJson
    , sleep
    , getFeaturePosition
    , getFeatureStatus
    , getFeatureProperties
} from './helpers'
import { saveDatapoint } from '../redis';

export const processLineByLine = async (vehicleId: string) => {
    try {

        const rl = readline.createInterface({
            input: fs.createReadStream('./data/data.json.log'),
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const gJson: Feature = parceGeoJson(line)

            saveDatapoint(
                vehicleId
                , getFeaturePosition(gJson)
                , {...getFeatureStatus(gJson), id: vehicleId}
                , {...getFeatureProperties(gJson), id: vehicleId}
            );

            await sleep(1000);
        }

        await events.EventEmitter.once(rl, 'close');
    } catch (err) {
        console.error(err);
    }
}