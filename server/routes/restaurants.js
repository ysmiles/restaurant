const Router = require('koa-router');
const router = new Router();
const Restaurant = require('../models/Restaurant')
const config = require('../config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


// disable the predix style, adjust to REST
// router.prefix('/restaurants')

router.get('/restaurant', async (ctx, next) => {
	//ctx.body = 'this is a users/bar response'

	let queryProps = { where: {} }

	// /restaurant?restaurantId=xx
	// redirected to specific restaurant food list
	if (ctx.query.restaurantId) {
		console.log('restaurantID: ' + ctx.query.restaurantId)
		let rURL =  config.url + 'foods?restaurantId=' + ctx.query.restaurantId
		this.redirect(rURL)
		return
	}

	// /restaurant/?search=keyWord
	// search for given keywork, no inside blank allowed
	if (ctx.query.search) {
		let keyWords = '%' + ctx.query.search.trim() + '%'
		console.log('search for all restaurant contains: ' + ctx.query.search)

		queryProps.where.name = { [Op.like]: keyWords }
	}

	// /restaurant/?page=2&per_page=20
	if (ctx.query.page && ctx.query.per_page) {
		console.log('page num: ' + ctx.query.page)
		console.log('item num: ' + ctx.query.per_page)

		let pageInt = parseInt(ctx.query.page)
		let perInt = parseInt(ctx.query.per_page)
		let offsetInt = (pageInt - 1) * perInt

		queryProps.offset = offsetInt
      	queryProps.limit = perInt
	}

	try {
		let res = Restaurant.findAll(queryProps)
		ctx.body = res
	} catch (err) {
		console.log(err)
		ctx.body = {
			status: false,
			description: err
		}
	}
})

// no post or delete allowed
router.post('/restaurant', ctx => {
	ctx.status = 400
	ctx.body = {
		error: 'no post action allowed for restaurant'
	}
})

module.exports = router