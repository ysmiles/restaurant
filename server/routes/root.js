const router = require('koa-router')()


router.get('/:foodid', async (ctx, next) => {
  let title = 'Restaurant Project'
  await ctx.render('index', {
    title,
  })
})

router.get('/about', function (ctx, next) {
  ctx.body = 'The Restaurant Project'
})


module.exports = router