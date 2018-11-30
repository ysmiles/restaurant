const router = require('koa-router')()
const Food = require('../models/Food')


// disable the prefix setting
//router.prefix('/foods')

// all get method 
router
  .get('/foods', async (ctx, next) => {

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


    Food
      .findAll(queryProps)
      .then(result => {
        ctx.body = result
      })
      .catch(err => console.log(err))

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

    let food = JSON.parse(ctx.body)

    Food
      .create(food)
      .then(res => console.log('created' + res))
      .catch(err => console.log(err))

    return
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

    Food
      .findById(ctx.query.foodID)
      .then(found => {
        return found.destroy({ force: true })
      })
      .then(() => console.log('Deleted: ' + ctx.query.foodID))
      .catch(err => console.log(err))
    
      return
  })

  .all('/foods', async (ctx) => {
    ctx.throw(400, 'unrecognized action!')
  })

// /?foodID=xxx
// /?restaurantID=xxx
// ?restaurantID=xxx&page=4&pre_page=10

module.exports = router
