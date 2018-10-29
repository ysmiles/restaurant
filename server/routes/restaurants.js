const router = require('koa-router')()
const Restaurant = require('../models/Restaurant')

router.prefix('/restaurants')

router.get('/', async (ctx, next) => {
	ctx.body = 'this is a users response!'
})

// /restaurant/?page=2&pre_page=20
router.get('/:restaurant', async (ctx, next) => {
	//ctx.body = 'this is a users/bar response'
	console.log('restaurantID: ' + ctx.params.restaurant)
	console.log('page num: ' + ctx.query.page)
	console.log('item num: ' + ctx.query.pre_page)

	var restaurants = await Restaurant.findAll(ctx.params.restaurant)

	ctx.body = {

	}
})

module.exports = router