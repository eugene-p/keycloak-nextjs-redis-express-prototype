import { config } from 'dotenv';

const res = config({
    path: '.env.local'
})

import { v4 as uuid } from 'uuid';
import { processLineByLine } from './src/filereader';

const id = uuid();
const runner = async () => {
    do {
        await processLineByLine(id);
    } while (true);
}

runner();