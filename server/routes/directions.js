const Router = require('koa-router');
const router = new Router();
const routePlanning = require('../Gmaps/route')
const routes = require('../Gmaps/storage')

router.get('/routes', async (ctx) => {
    console.log('getting routes')
    ctx.body = routes
})

module.exports = router