/*
* router for orders
*/

const Router = require('koa-router');
const router = new Router();
const Order = require('../models/Orders')

module.exports = router