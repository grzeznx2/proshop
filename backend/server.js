const express = require('express')
const products = require('./data/products')

const app = express()

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product._id === id)

  if (product) {
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    })
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Product with provided ID does not exist',
    })
  }
})

app.listen(5000, console.log('Server running on PORT 5000'))
