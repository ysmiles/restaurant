const Router = require('koa-router');
const router = new Router();
//const routePlanning = require('../gmaps/route')
//const routes = require('../gmaps/storage')
const fetched = require('../gmaps/storage').fetched;
const stored = require('../gmaps/storage').stored;

router.prefix('/api/');

router.get('/routes', async (ctx) => {
    console.log('getting routes')
    ctx.body = fetched.concat(stored).map(o => o.route);
})

router.get('/route/query', async (ctx) => {
    let id = ctx.query.id;
    for(let i = 0; fetched[i] != null; i++) {
        if(id in fetched[i].orderId) {
            ctx.body = fetched[i].route;
            return;
        }
    }

    for(let i = 0; stored[i] != null; i++) {
        if(id in stored[i].orderId) {
            ctx.body = stored[i].route;
            return;
        }
    }


    ctx.body = {
        status: false,
        description: 'no planned route for this order id'
    }
});

router.get('/routes/fetchOne', async (ctx) => {
    let task = stored.pop();
    if(task) {
        fetched.push(task);
        ctx.body = task.route;
    } else {
        ctx.body = {
            status: false,
            description: 'no planned route available'
        }
    }
});

router.get('/routes/restart', async(ctx) => {
    stored.push(...fetched);
    fetched.length = 0;
});


module.exports = router