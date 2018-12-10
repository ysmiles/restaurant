const Router = require('koa-router');
const router = new Router();
//const routePlanning = require('../gmaps/route')
//const routes = require('../gmaps/storage')
const fetched = require('../gmaps/storage').fetched;
const stored = require('../gmaps/storage').stored;

router.prefix('/api/');

function translateRequest(direction) {
    //console.log(direction)
    res = {};
    res.travelMode = 'DRIVING';
    res.optimizeWaypoints = true;
    res.waypoints = [];
    res.origin = direction.origin;
    res.destination = direction.destination;

    if("waypoints" in direction) {
        let ws = new Set(direction.waypoints.split("|"));
        for(let w of ws) {
            res.waypoints.push({
                location: w,
                stopover: true
              });
        }
    }

    return res;
}

router.get('/routes', async (ctx) => {
    console.log('getting routes')
    ctx.body = fetched.concat(stored).map(o => translateRequest(o.direction));
})

router.post('/routes/query', async (ctx) => {
    let id = ctx.request.body.id;
    
    for(let i = 0; fetched[i] != null; i++) {
        console.log(fetched[i].orderId)
        if(fetch[i].orderId.indexOf(id) !== -1) {
            //ctx.body = fetched[i].route;
            ctx.body = translateRequest(fetched[i].direction);
            return;
        }
    }

    for(let i = 0; stored[i] != null; i++) {
        console.log(stored[i].orderId)
        if(stored[i].orderId.indexOf(id) !== -1) {
            //ctx.body = stored[i].route;
            ctx.body = translateRequest(stored[i].direction);
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

        let dummyTask = JSON.parse(JSON.stringify(task));

        if("waypoints" in dummyTask.direction) {
            dummyTask.direction.waypoints = dummyTask.direction.origin + "|" + dummyTask.direction.waypoints;
        } else {
            dummyTask.direction.waypoints = "" + dummyTask.direction.origin;
        }

        let s = new Set(dummyTask.description.waypoints.split('|'))

        dummyTask.direction.waypoints = [...s].join('|')

        dummyTask.direction.origin = "1 Washington Sq, San Jose, CA 95192";

        ctx.body = dummyTask;
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