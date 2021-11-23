import Router from 'koa-router'
import {
    AppEvent
    , triggerEvent
    , VEHICLES_ACTIONS
} from '../eventQueue';
import * as vehiclesData from "../data/vehicles";

const vehicles = new Router({
    prefix: '/vehicles'
})

vehicles
    .get(
        '/'
        , async (ctx, next) => {
            ctx.body = await vehiclesData.listVehicles()
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: VEHICLES_ACTIONS.LISTED
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )
    .get(
        '/:id'
        , async (ctx, next) => {
            ctx.body = await vehiclesData.getVehicle(ctx.params.id)
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.GET}.${ctx.params.id}`
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )
    .post(
        '/'
        , async (ctx, next) => {
            ctx.body = 'Not implemented'
            ctx.status = 501
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.CREATE}.${ctx.params.id}`
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )
    .put(
        '/:id'
        , async (ctx, next) => {
            ctx.body = 'Not implemented'
            ctx.status = 501
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.UPDATE}.${ctx.params.id}`
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )
    .put(
        '/:id/driver/:driverId'
        , async (ctx, next) => {
            ctx.body = 'Not implemented'
            ctx.status = 501
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.SET_DRIVER}.vehicle.${ctx.params.id}.driver.${ctx.params.driverId}`
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )
    .delete(
        '/:id'
        , async (ctx, next) => {
            ctx.body = 'Not implemented'
            ctx.status = 501
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: `${VEHICLES_ACTIONS.DELETE}.${ctx.params.id}`
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )

export default vehicles