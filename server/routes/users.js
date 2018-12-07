const Router = require('koa-router');
const router = new Router();
const User = require('../models/User')

// To do: authetication for log in


// when log in the cache on client should store its own id
// /user?customer_id=xxx
router
    .get('/user', async (ctx, next) => {
        if (!ctx.query.customerId) {
            ctx.body = {
                status: false,
                description: 'The query for user must has customer_id property!'
            }
            return
        }

        try {
            let user = await User.findById(ctx.query.customerId)
            ctx.body = user
            console.log(user)
        } catch (err) {
            console.log(err)
            ctx.body = err
        }
        return
    })

    .post('/user', async (ctx) => {
        if (!ctx.request.body) {
            ctx.throw(400, 'no expected post data received')
        }

        if (ctx.request.body.customerId) {
            ctx.throw(400, 'user ID is not allowed')
        }

        try {
            let user = await User.create(ctx.request.body)
            ctx.body = user
            console.log(user)
        } catch (err) {
            console.log(err)
        }
        return
    })

    .all('/user', (ctx) => {
        ctx.throw(400, 'unrecognized action!')
    })

router.post('/user/login', async (ctx) => {
    if (!ctx.request.body) {
        ctx.throw(400, 'no expected post data received')
    }

    let res = {status: false}

    try {
        let user = await User.findOne({where: {email: ctx.request.body.email}})
        // console.log(user)
        if (user.password === ctx.request.body.password) {
            res.status = true
            res.id = user.customer_id
        }
    } catch (err) {
        console.log(err)
    } finally {
        ctx.body = res
    }
})

module.exports = router
