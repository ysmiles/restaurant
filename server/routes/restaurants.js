const router = require('koa-router')()
const Restaurant = require('../models/Restaurant')

router.prefix('/restaurants')

router.get('/', async (ctx, next) => {
	//ctx.body = 'this is a users/bar response'

	// /restaurant/?id=restaurantID
	// redirected to specific restaurant food list
	if (ctx.query.id) {
		console.log('restaurantID: ' + ctx.query.id)
		rHost = 'http://127.0.0.1:8080/foods/.....'
		rURL = rHost + '?id=' + ctx.query.id 
		this.redirect(rURL)
	} 
	
	// /restaurant/?page=2&pre_page=20
	else {
		console.log('page num: ' + ctx.query.page)
		console.log('item num: ' + ctx.query.pre_page)
	}
	

	var restaurants = await Restaurant.findAll(ctx.params.restaurant)

	ctx.body = {

	}
})

module.exports = router