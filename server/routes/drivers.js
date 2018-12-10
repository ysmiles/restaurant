const Router = require('koa-router');
const router = new Router();
const Driver = require('../models/Driver')
const Orders = require('../models/Orders')
const Restaurant = require('../models/Restaurant')
const User = require('../models/User')
const Orders_item = require('../models/Orders_item')
const Food = require('../models/Food')

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
        
        let existed = await Driver.findOne({where: {email: email}})
        if(existed) {
        	ctx.body = "existed"
        	console.log("existed")
        	return
        }
        
        let driver = await Driver.create({first_name: first_name, last_name: last_name,
                       					  phone_number: phone_number, email: email,
                       					  password: password, license_plate: license_plate,
                       					  car_year: car_year, car_made: car_made,
                       				      car_model: car_model, car_submodel: car_submodel,
                       				      car_color: car_color})
        if(!driver) {
        	ctx.body = "error"
        	console.log("error")
        	return
        }
        
        ctx.body = driver.driver_id
        console.log("Driver ID is " + driver.driver_id)
        return
    })
    
    .post('/driver/updateProfile', async (ctx) => {
    	let driver_id = ctx.request.body.driver_id
    	let first_name = ctx.request.body.first_name
    	let last_name = ctx.request.body.last_name
    	let phone_number = ctx.request.body.phone_number
    	
    	let driver = await Driver.findOne({where: {driver_id: driver_id}})
    	driver.update({first_name: first_name, last_name: last_name, 
    				   phone_number: phone_number})
    				   
    	ctx.body = "updated"
    	console.log("updated")
        return
    })
    
    .post('/driver/updatePassword', async (ctx) => {
    	let driver_id = ctx.request.body.driver_id
    	let password = ctx.request.body.password
    	
    	let driver = await Driver.findOne({where: {driver_id: driver_id}})
    	driver.update({password: password})
    	
    	ctx.body = "updated"
        return
    })
    
    .post('/driver/updateCarRegistration', async (ctx) => {
    	let driver_id = ctx.request.body.driver_id
    	let license_plate = ctx.request.body.license_plate
		let car_year = ctx.request.body.car_year
		let car_made = ctx.request.body.car_made
		let car_model = ctx.request.body.car_model
		let car_submodel = ctx.request.body.car_submodel
		let car_color = ctx.request.body.car_color
		
		let driver = await Driver.findOne({where: {driver_id: driver_id}})
    	driver.update({license_plate: license_plate, car_year: car_year, 
    				   car_made: car_made, car_model: car_model,
    				   car_submodel: car_submodel, car_color: car_color})
    				   
    	ctx.body = "updated"
    	console.log("updated")
        return
    })
    
    .post('/driver/getOrderDetail', async (ctx) => {
    	let orders_id = ctx.request.body.orders_id
    	let orders = await Orders.findOne({where: {orders_id: orders_id}})
    	let customer = await User.findOne({where: {customer_id: orders.customer_id}})
    	
    	let orders_items = await Orders_item.findAll({where: {orders_id: orders_id}})
    	let restaurant_name = ""
    	let restaurant_address = ""
    	let items = []
    	let quantity = []
    	for(var i = 0; i < orders_items.length; i++) {
    		let food = await Food.findOne({where: {item_id: order_items[i].item_id}})
    		let restaurant = await Restaurant.findOne({where: {restaurant_id: food.restaurant_id}})
    		restaurant_name = restaurant.name
    		restaurant_address = restaurant.address
    		items.push(food.name)
    		quantity.push(order_items[i].quantity)
    	}
		
		ctx.body = {
			customer_name: customer.first_name + " " + customer.last_name,
			customer_address: orders.address,
			restaurant_name: restaurant_name,
			restaurant_address: restaurant_address,
			items: items,
			quantity: quantity
		}
        return
    })

module.exports = router
