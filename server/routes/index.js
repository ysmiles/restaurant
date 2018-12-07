const combineRouters = require('koa-combine-routers')
//const Router = require('koa-router')()

const rootRouter = require('./root')
const userRouter = require('./users')
const foodRouter = require('./foods')
const orderRouter = require('./orders')
const restaurantRouter = require('./restaurants')
const directionRouter = require('./directions')


const router = combineRouters(
    rootRouter,
    restaurantRouter,
    userRouter,
    foodRouter,
    orderRouter,
    directionRouter
)

module.exports = router