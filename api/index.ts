import {config} from 'dotenv'
config({
    path: '.env.local'
})

import Express, { Response, Request, NextFunction } from 'express'
import http from 'http'
import cors from 'cors'
import session from 'express-session'
import Vehiles from './src/routes/vehicles'
import Drivers from './src/routes/drivers'
import initKeycloak, {memoryStore} from './src/initKeycloak'

const app = Express();
app.use(session({
    secret: 'ewriweirfmusdfugsdprw98 39qf awufdhcb asjdfggqo8 fRCQ#$R w',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
const keycloak = initKeycloak()
app.use(cors())
app.use(keycloak?.middleware())

app.use('/vehicles', Vehiles)
app.use('/drivers', Drivers)

app.use(function (err: { stack: any }, _req:Request, res:Response, _next:NextFunction) {
    console.error(err.stack)
    res.status(500).send('Nothing')
})

const server = http.createServer(app)
server.listen(process.env.APP_PORT, () => {
    console.log(`Running on ${process.env.APP_PORT}`)
})
