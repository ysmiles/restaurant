const Router = require('koa-router');
const router = new Router();


router.get('/about', function (ctx, next) {
    ctx.body = 'The Restaurant Project'
})


module.exports = router