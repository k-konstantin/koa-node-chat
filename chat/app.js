const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const router = require('./routes/router')

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
	require('./libs/trace')
}

const app = new Koa()

fs.readdirSync(path.join(__dirname, 'handlers'))
	.sort()
	.forEach(handlerName => {
		require('./handlers/' + handlerName).init(app)
	})

app
	.use(router.routes())
	.use(router.allowedMethods())

module.exports = app
