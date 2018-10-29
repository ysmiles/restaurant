const router = require('koa-router')()


router.get('/about', function (ctx, next) {
  ctx.body = 'The Restaurant Project'
})


module.exports = router