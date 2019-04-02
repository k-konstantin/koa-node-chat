// Usually served by Nginx
const serve = require('koa-static')
const config = require('../config/default')

exports.init = app => app.use(serve(config.public))
