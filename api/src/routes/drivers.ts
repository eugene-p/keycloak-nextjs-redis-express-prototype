import Router from 'koa-router'
import {
    AppEvent
    , triggerEvent
    , DRIVERS_ACTIONS
} from '../eventQueue'

const drivers = new Router({
    prefix: '/drivers'
})

drivers
    .get(
        '/'
        , async (ctx, next) => {
            ctx.body = 'Not implemented'
            ctx.status = 501
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: DRIVERS_ACTIONS.LISTED
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )
    .get(
        '/:id'
        , async (ctx, next) => {
            ctx.body = 'Not implemented'
            ctx.status = 501
            await next();
        }
        , async ctx => {
            const event: AppEvent = {
                type: `${DRIVERS_ACTIONS.GET}.${ctx.params.id}`
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
                type: DRIVERS_ACTIONS.CREATE
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
                type: `${DRIVERS_ACTIONS.UPDATE}.${ctx.params.id}`
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
                type: `${DRIVERS_ACTIONS.DELETE}.${ctx.params.id}`
                , properties: ctx.body
            }
            await triggerEvent(event)
        }
    )

export default drivers