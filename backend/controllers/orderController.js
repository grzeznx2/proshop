import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  console.log(shippingAddress)

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const newOrder = await Order.create({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    })

    res.status(201).json(newOrder)
  }
})

export const getOrderById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const order = await Order.findById(id).populate('user', 'name email')
  console.log('ELO')
  if (!order) {
    res.status = 404
    throw new Error('There is no order with provided ID')
  }

  res.json(order)
})
