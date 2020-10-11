const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const products = require('./data/products')

dotenv.config()

const app = express()

app.use(cors())

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product._id === id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Product with provided ID does not exist',
    })
  }
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
  )
)
