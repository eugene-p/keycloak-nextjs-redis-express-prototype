import {config} from 'dotenv'
config({
    path: '.env.local'
})

import Koa from 'koa'
import http from 'http'
import KoaLogger from 'koa-logger'

import vehicles from './src/routes/vehicles'
import drivers from './src/routes/drivers'

const app = new Koa()
app.use(async (ctx, next) => {
    ctx.set(
        'Access-Control-Allow-Origin'
        , '*'
    );
    ctx.set(
      'Access-Control-Allow-Headers'
      , 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    await next()
})
app.use(KoaLogger())

app.use(vehicles.routes())
    .use(vehicles.allowedMethods())
    .use(drivers.routes())
    .use(drivers.allowedMethods())

const server = http.createServer(app.callback())
server.listen(process.env.APP_PORT, () => {
    console.log(`Running on ${process.env.APP_PORT}`)
})
