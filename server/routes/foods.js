const router = require('koa-router')()
const Food = require('../models/Food')

// all return obejcts will be converted to JSON
const json = require('koa-json')

// disable the prefix setting
//router.prefix('/foods')

// all get method 
router.get('/foods', async (ctx, next) => {

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

router.post('/foods', async (cyx, next) => {
  
})

// /?foodID=xxx
// /?restaurantID=xxx
// ?restaurantID=xxx&page=4&pre_page=10

module.exports = router
