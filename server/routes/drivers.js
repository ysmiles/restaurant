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
<<<<<<< HEAD
        if(driver.driver_id == null) {
        	ctx.body = "error"
        	console.log("wrong email address or password")
        }
        else {
            ctx.body = driver
            console.log(driver)
        }
=======
        ctx.body = driver
        console.log(driver)
>>>>>>> upstream/master
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
        
        let existed = await Driver.findOne({where: {email: email}})
        if(existed.length > 0) {
        	ctx.body = "existed"
        	return
        }
        
        let driver = Driver.create({first_name: first_name, last_name: last_name,
                       				phone_number: phone_number, email: email,
                       				password: password, license_plate: license_plate,
                       				car_year: car_year, car_made: car_made,
                       				car_model: car_model, car_submodel: car_submodel,
                       				car_color: car_color})
        if(driver.length == 0) {
        	ctx.body = "error"
        	return
        }
        
        ctx.body = driver.driver_id
        return
    })

module.exports = router
