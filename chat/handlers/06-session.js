// in-memory store by default (use the right module instead)
const session = require('koa-session')
const config = require('../config/default')

exports.init = app => app.use(session(config.session, app))