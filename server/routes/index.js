const combineRouters = require('koa-combine-routers')
//const Router = require('koa-router')()

const rootRouter = require('./root')
const userRouter = require('./users')
const foodRouter = require('./foods')
const orderRouter = require('./orders')
const restaurantRouter = require('./restaurants')


const router = combineRouters(
  rootRouter,
  restaurantRouter,
  userRouter,
  foodRouter,
  orderRouter
)

module.exports = router