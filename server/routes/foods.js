const Router = require('koa-router');
const router = new Router();
const Food = require('../models/Food')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


// disable the prefix setting
//router.prefix('/foods')

// all get method 
router
    .get('/foods', async (ctx) => {
        console.log('find foods...')

        let queryProps = {where: {}}

        if (ctx.query.restaurantId) {
            queryProps.restaurant_id = ctx.query.restaurantId
        }

        // search for the keyword, no inside blank allowed
        if (ctx.query.search) {
            let keyWords = '%' + ctx.query.search.trim() + '%'
            console.log('search for all foods match: ' + ctx.query.search)

            // add food name property to query statement
            queryProps.where.name = {[Op.like]: keyWords}


        }

        // The search mode and foodID query is incompatible and search mode has priority over foodID
        else if (ctx.query.itemId) {
            queryProps.where.item_id = ctx.query.itemId
        }

        if (ctx.query.page && ctx.query.per_page) {
            let pageInt = parseInt(ctx.query.page)
            let perInt = parseInt(ctx.query.per_page)
            let offsetInt = (pageInt - 1) * perInt

            queryProps.offset = offsetInt
            queryProps.limit = perInt
        }

        try {
            let res = await Food.findAll(queryProps)
            ctx.body = res
        } catch (err) {
            console.log(err)
            ctx.body = {
                status: false,
                description: err
            }
        }
    })

    // add food item to database, need authentication pre-process
    .post('/foods', async (ctx, next) => {
        if (!ctx.request.body) {
            ctx.status = 400
            ctx.body = {
                status: false,
                description: `no expected object received, the post data: ${ctx.request.body}`
            }
            return
        }

        try {
            //let food = JSON.parse(ctx.request.body)
            console.log('received: ' + ctx.request.body)

            let newFood = await Food.create(ctx.request.body)
            console.log('created: ' + newFood)
            ctx.body = newFood
        } catch (err) {
            console.log(err)
            ctx.body = {
                status: false,
                description: err
            }
        }
    })

    .put('/foods', async (ctx, next) => {
        if (!ctx.request.body) {
            ctx.status = 400
            ctx.body = {
                status: false,
                description: `no expected object received, the post data: ${ctx.request.body}`
            }
            return
        }

        try {
            let found = await Food.findById(ctx.body.itemId)

            found = await found.update(ctx.body)

            console.log(found)

            ctx.body = `update success, the updated item: ${ctx.request.body}`
        } catch (err) {
            console.log(err)
            ctx.body = {
                status: false,
                description: err
            }
        }
    })

    .del('/foods', async (ctx, next) => {
        if (!ctx.query.itemId) {
            console.log('deleting Item needs itemId')
            ctx.body = {
                status: false,
                description: 'no itemId received'
            }
            return
        }

        try {
            let found = await Food.findById(ctx.query.itemId)
            let num = await found.destroy({force: true})
            ctx.body = `deleted ${num} item(s) successfully, the item id: ${ctx.query.itemId}`
        } catch (err) {
            console.log(err)
            ctx.body = {
                status: false,
                description: err
            }
        }
    })

    .all('/foods', async (ctx) => {
        ctx.throw(400, 'unrecognized action!')
    })

module.exports = router
