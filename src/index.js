import express from 'express'
import categoriesRoutes from './routes/categories.routes.js'
import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})


app.use(indexRoutes)
app.use('/api/v1', categoriesRoutes)
app.use('/api/v1', usersRoutes)

app.listen(3000, () => {
	console.log("Su aplicación está corriendo en el puerto 3000")
})
