const app = require('../app')
const { port } = require('../config/default')
const rp = require('request-promise').defaults({
	resolveWithFullResponse: true,
	//encoding: null, //if null return boyd as Buffer
	simple: false,
	json: true,
})

const host = `http://localhost:${port}`

const delay = (ms) => new Promise(resolve => {
	setTimeout(resolve, ms)
})

describe('testing app', () => {
	let server

	beforeAll(done => {
		server = app.listen(port, done)
	})

	afterAll(done => {
		server.close(done)
	})

	it('client should receive message', done => {
		Promise
			.all([
				rp.get(`${host}/subscribe`),
				rp.get(`${host}/subscribe`),
				delay(500).then(() => rp.post(`${host}/publish`, { body: { message: 'hello' } }))
			])
			.then(data => {
				expect(data[0].body).toEqual('hello')
				expect(data[1].body).toEqual('hello')
				expect(data[2].statusCode).toBe(200)
				done()
			})
			.catch(err => done(err))
	})

	it('should return error if message is large than 56kb', done => {
		let message = ''
		while (message.length < 57 * 1024) {
			message += 'message message '
		}

		rp.post(`${host}/publish`, { body: { message: message } })
			.then(response => {
				expect(response.statusCode).toBe(413)
				done()
			})
			.catch(err => done(err))
	})
})
