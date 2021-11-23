import { createClient } from 'redis';
const port = parseInt(process.env.REDIS_PORT || '0', 10)

const client = createClient( {socket: {port: port}} )
client.connect()

export default client;
