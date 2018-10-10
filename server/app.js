// Koa2 is fully compatible with es6 syntax
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// ejs is fully compatible with html 
const ejs = require('ejs')

// const index = require('./routes/index')
// const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// directly fetch the static resources: localhost:port/resources_name
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// map ejs file to html, make it possible to use ejs syntax in html file
app.use(views(__dirname + '/views', {
  map: { html: 'ejs' }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// routes
const routes = require('./routes/index')
app.use(routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
