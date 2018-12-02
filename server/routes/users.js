const router = require('koa-router')()
const User = require('../models/User')

// To do: authetication for log in


// when log in the cache on client should store its own id
// /user?customer_id=xxx
router
	.get('/user', async (ctx, next) => {
		if (!ctx.query.customer_id) return
		User
			.findById(ctx.query.customer_id)
			.then(found => {
				ctx.body = found
			})
			.catch(err => console.log(err))

		return
	})

	.post('/user', async (ctx) => {
		if (!ctx.request.body) {
			ctx.throw(400, 'no expected post data received')
    }

    let user = JSON.parse(ctx.body)
    if(user.customer_id) {
      ctx.throw(400, 'user ID is not allowed')
    }

		User
			.create(user)
			.then(res => console.log('created user:' + res))
			.catch(err => console.log(err))

		return
  })
  
  .put('/user', async (ctx) => {
    if (!ctx.request.body) {
			ctx.throw(400, 'no expected post data received')
    }

    let user = JSON.parse(ctx.body)

		User
			.findById(user.customer_id)
			.then(res => {
        res.update(user).then(res => console.log(res))
      })
			.catch(err => console.log(err))

		return
  })

  .all('/user', (ctx) => {
    ctx.throw(400, 'unrecognized action!')
  })



module.exports = router
