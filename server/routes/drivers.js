const Router = require('koa-router');
const router = new Router();
const Driver = require('../models/Driver')

// To do: authetication for log in

router.prefix('/api/');

router
    .post('/driver/login', async (ctx) => {
		try {
			let email = ctx.request.body.email
			let password = ctx.request.body.password
            let driver = await Driver.findOne({where: {email: email, password: password}})
            ctx.body = driver
            console.log(driver)
        } catch (err) {
        	ctx.body = "error"
            console.log(err)
        }
        return
    })

module.exports = router
