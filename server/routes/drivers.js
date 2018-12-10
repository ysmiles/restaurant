const Router = require('koa-router');
const router = new Router();
const Driver = require('../models/Driver')

// To do: authetication for log in

router.prefix('/api/');

router
    .post('/driver/login', async (ctx) => {
		let email = ctx.request.body.email
		let password = ctx.request.body.password
        let driver = await Driver.findOne({where: {email: email, password: password}})
        ctx.body = driver
        console.log(driver)
        return
    })
    
    .post('/driver/signup', async (ctx) => {
    	let first_name = ctx.request.body.first_name
    	let last_name = ctx.request.body.last_name
    	let phone_number = ctx.request.body.phone_number
		let email = ctx.request.body.email
		let password = ctx.request.body.password
		let license_plate = ctx.request.body.license_plate
		let car_year = ctx.request.body.car_year
		let car_made = ctx.request.body.car_made
		let car_model = ctx.request.body.car_model
		let car_submodel = ctx.request.body.car_submodel
		let car_color = ctx.request.body.car_color
        
        return
    })

module.exports = router
