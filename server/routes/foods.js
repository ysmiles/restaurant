//const router = require('koa-router')()
const Router = require('koa-router');
const router = new Router();
const Food = require('../models/Food')


// disable the prefix setting
//router.prefix('/foods')

// all get method 
router
  .get('/foods', async (ctx) => {
    console.log('find foods...')

    let queryProps = { where: {} }

    if (ctx.query.restaurantId) {
      queryProps.restaurant_id = ctx.query.restaurantId
    }

    // search for the keyword, no inside blank allowed
    if (ctx.query.search) {
      let keyWords = '%' + ctx.query.search.trim() + '%'
      console.log('search for all foods match: ' + ctx.query.search)

      // add food name property to query statement
      queryProps.where.name = { [Op.like]: keyWords }


    }

    // The search mode and foodID query is incompatible and search mode has priority over foodID
    else if (ctx.query.foodId) {
      queryProps.where.item_id = ctx.query.foodID
    }

    if (ctx.query.page && ctx.query.per_page) {
      let pageInt = parseInt(ctx.query.page)
      let perInt = parseInt(ctx.query.per_page)
      let offsetInt = (pageInt - 1) * perInt

      queryProps.offset = offsetInt
      queryProps.limit = perInt
    }


    let res = await Food
      .findAll(queryProps)
      .catch(err => console.log(err))

    ctx.body = res

    return
  })

  // add food item to database, need authentication pre-process
  .post('/foods', async (ctx, next) => {
    if (!ctx.request.body) {
      ctx.status = 400
      ctx.body = {
        error: `no expected object received, the post data: ${ctx.request.body}`
      }
      return
    }

    try {
      //let food = JSON.parse(ctx.request.body)
      console.log('received: ' + ctx.request.body)

      let newFood = await Food.create(ctx.request.body)
      console.log('created: ' + newFood)
      ctx.body = newFood
    } catch (err) {
      console.log(err)
    }
  })

  .put('/foods', async (ctx, next) => {
    if (!ctx.request.body) {
      ctx.status = 400
      ctx.body = {
        error: `no expected object received, the post data: ${ctx.request.body}`
      }
      return
    }

    let food = JSON.parse(ctx.body)

    Food
      .findById(food.item_id)
      .then(found => {
        found.update(food).then(res => console.log(res))
      })
      .catch(err => console.log(err))
    return
  })

  .del('/foods', async (ctx, next) => {
    if (!ctx.query.foodID) {
      console.log('deleting Item needs foodID')
      return
    }

    try {
      let found = await Food.findById(ctx.query.foodId)
      return found.destroy({ force: true })
    } catch (err) {
      console.log(err)
    }
  })

  .all('/foods', async (ctx) => {
    ctx.throw(400, 'unrecognized action!')
  })

module.exports = router
