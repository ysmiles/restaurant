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

/*
Router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
*/

/*
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
*/


