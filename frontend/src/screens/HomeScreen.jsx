import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { listProducts } from '../actions/productActions'

import Product from '../components/Product'

const Homescreen = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(state => state.productList)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products &&
            products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default Homescreen
