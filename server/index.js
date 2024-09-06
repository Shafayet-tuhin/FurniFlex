const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT ||5000 ;
const cors = require('cors')

const mongoose = require('mongoose');
app.use(express.json()) ;
app.use(cors()) ;

const ProductRouter = require('./Router/productRouter.js')
const CartRouter = require('./Router/cartRouter.js')
const PaymentRouter = require('./Router/paymentRouter.js')

const DB_ID = process.env.DB_ID
const DB_PASS = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${DB_ID}:${DB_PASS}@tuhin.nxzywfc.mongodb.net/FurniFlex?retryWrites=true&w=majority&appName=tuhin`)
.then(() => console.log('MongoDB Connected...'))


app.use('/products' , ProductRouter)
app.use('/cart' , CartRouter)
app.use('/payment' , PaymentRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  