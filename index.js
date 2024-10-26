const express = require('express')
const app = express()
const port = 8080

app.use(express.json())

//obtenemos los routers designados para cada seccion
const productsRouter = require('./Routes/products')
const cartsRouter = require('./Routes/carts')

//asignamos los routers 
app.use('/products',productsRouter)
app.use('/carts',cartsRouter)

app.listen(port, () => {
    console.log(`example app listening on port: ${port}`)
})