const Router = require('koa-router')

const router = new Router()

let clients = []

router.get('/subscribe', async (ctx, next) => {
	clients.push(ctx)

	ctx.req.on('close', () => {
		clients.splice(clients.indexOf(ctx), 1)
	})

	await new Promise(res => {
		ctx.sendMessage = (msg) => {
			ctx.body = msg
			res()
		}
	})
})

router.post('/publish', async (ctx, next) => {

	clients.forEach(clientCtx => {
		clientCtx.sendMessage(ctx.request.body.message ? ctx.request.body.message : '')
	})

	clients = []

	ctx.body = 'OK'
})

module.exports = router