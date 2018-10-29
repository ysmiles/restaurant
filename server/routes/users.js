const router = require('koa-router')()
const User = require('../models/User')

router.prefix('/users')

router.get('/', async (ctx, next) => {
	ctx.body = 'this is a users response!'
})

router.get('/bar', async (ctx, next) => {
	ctx.body = 'this is a users/bar response'
})

router.post('/', async (ctx, next) => {

	var user = await User.create({
		id: 'd-' + now,
		name: ctx.body.name,
		gender: ctx.body.gender,
		birth: ctx.body.birth,
		createdAt: now,
		updatedAt: now,
		version: 0
	});
	console.log('created: ' + JSON.stringify(user));
})

module.exports = router
