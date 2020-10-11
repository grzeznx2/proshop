import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)

    if (product) res.json(product)
    else
      res.status(404).json({
        message: 'Product with provided ID does not exist',
      })
  })
)

export default router
