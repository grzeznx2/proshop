//1. Załaduj dane do DB
//1. Połącz z DB
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
//2. Zaimportuj products i users
import products from './data/products.js'
import users from './data/users.js'
//3. Zaimportuj productModel i userModel
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminId = createdUsers[0]._id

    const sampleProducts = products.map(product => ({
      ...product,
      user: adminId,
    }))

    await Product.insertMany(sampleProducts)

    console.log(`Data imported succesfully`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.red.inverse)
    process.exit(1)
  }
}
const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log(`Data deleted succesfully`.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') deleteData()
else importData()
