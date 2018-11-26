const router = require('koa-router')()

router.prefix('/foods')

router.get('/:foodid', async (ctx, next) => {
  ctx.body = 'you are querying ' + ctx.params.foodid
})

// /?foodID=xxx
// /?restaurantID=xxx
// ?restaurantID=xxx&page=4&pre_page=10

module.exports = router
