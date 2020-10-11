import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'

const Homescreen = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/products')

        setLoading(false)
        setProducts(data)
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Row>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {products &&
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default Homescreen
