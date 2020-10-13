import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PlaceOrderScreen = () => {
  const {
    shippingAddress: { address, postalCode, city, country },
    paymentMethod,
    cartItems,
  } = useSelector(state => state.cart)

  const itemsPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.qty
  }, 0)

  const shippingPrice = 20

  const taxPrice = Number((0.15 * itemsPrice).toFixed(2))

  const totalPrice = itemsPrice + shippingPrice + taxPrice

  const placeOrderHandler = e => {
    e.preventDefault()
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>
                  Address:{` ${address}, ${city} ${postalCode}, ${country}`}
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:{` ${paymentMethod}`}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Ordered Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.price * item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <p>
                <strong>Method:{` ${paymentMethod}`}</strong>
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
