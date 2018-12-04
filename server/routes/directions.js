const Router = require('koa-router');
const router = new Router();
const routePlanning = require('../gmaps/route')
const routes = require('../gmaps/storage')

router.get('/routes', async (ctx) => {
    console.log('getting routes')
    ctx.body = routes
})

module.exports = router