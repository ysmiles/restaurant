const router = require('koa-router')()

router.prefix('/foods')

router.get('/:foodid', async (ctx, next) => {
  ctx.body = 'you are querying ' + ctx.params.foodid
})

module.exports = router
