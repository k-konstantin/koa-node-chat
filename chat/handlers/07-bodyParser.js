// Parse application/json, application/x-www-form-urlencoded
// NOT form/multipart!
const koaBody = require('koa-body')

// ctx.request.body = ..
exports.init = app => app.use(koaBody({
	jsonLimit: '56kb'
}))
