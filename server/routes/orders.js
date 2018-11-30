/*
* router for orders
*/

const router = require('koa-router')()
const Food = require('../models/Order')

// all return obejcts will be converted to JSON
const json = require('koa-json')