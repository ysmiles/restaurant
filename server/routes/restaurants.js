const router = require('koa-router')()
const Restaurant = require('../models/Restaurant')
const config = require('../config')

// all return obejcts will be converted to JSON
const json = require('koa-json')

// disable the predix style, adjust to REST
// router.prefix('/restaurants')

router.get('/restaurant', async (ctx, next) => {
	//ctx.body = 'this is a users/bar response'

	// /restaurant/?id=restaurantID
	// redirected to specific restaurant food list
	if (ctx.query.restaurantId) {
		console.log('restaurantID: ' + ctx.query.restaurantId)
		let rURL =  config.url + 'foods?restaurantId=' + ctx.query.restaurantId
		this.redirect(rURL)
	}

	// /restaurant/?search=keyWord
	// search for given keywork, no inside blank allowed
	else if (ctx.query.search) {
		let keyWords = '%' + ctx.query.search.trim() + '%'
		console.log('search for all restaurant contains: ' + ctx.query.search)

		Restaurant
			.findAll({
				where: {
					name: {
						[Op.like]: keyWords
					}
				}
			})
			.then(result => {
				ctx.body = result
			})
			.catch(err => console.log(err))
	}

	// cautions: this may cause problems due to the large amount of rows
	else if (!ctx.query.page || !ctx.query.per_page) {
		console.log('query all restaurant')
		Restaurant
			.all()
			.then(result => {
				ctx.body = result;
			})
			.catch(err => console.log(err))
	}

	// /restaurant/?page=2&per_page=20
	else if (ctx.query.page && ctx.query.per_page) {
		console.log('page num: ' + ctx.query.page)
		console.log('item num: ' + ctx.query.per_page)

		let pageInt = parseInt(ctx.query.page)
		let perInt = parseInt(ctx.query.per_page)
		let offsetInt = (pageInt - 1) * perInt

		// if the offset exceed the row number, an empty array will be returned
		Restaurant
			.findAll({
				offset: offsetInt,
				limit: perInt
			})
			.then(result => {
				// return the rows directly, the return value will be arrays of JSON
				ctx.body = result
			})
			.catch(err => console.log(err))
	}

	else {
		ctx.status = 404
		ctx.body = {
			error: 'no resource found' + ctx.querystring
		}
	}

	return
})

// no post or delete allowed
router.post('/restaurant', ctx => {
	ctx.status = 400
	ctx.body = {
		error: 'no post action allowed for restaurant'
	}
})

module.exports = router