const { port } = require('./config/default')
const app = require('./app')

app.listen(port, () => {
	console.log(`Server listen ${port} port`)
})