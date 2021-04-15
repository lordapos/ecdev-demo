import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { navigate } from 'gatsby'
import {
  ORDER_CREATE_RESET,
  USER_DETAILS_RESET,
} from '../../redux/actions/actionTypes'
import { createOrder } from '../../redux/actions/orderAction'
import Message from '../../components/Message/Message'
import { updateCart } from '../../redux/actions/cartAction'
import './_place-order.scss'

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const [items, setItems] = useState(0)
  const [price, setPrice] = useState(0)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart])

  useEffect(() => {
    setItems(cartItems.reduce((acc, item) => acc + item.qty, 0))
    setPrice(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
  }, [cartItems, price])

  cart.itemsPrice = addDecimals(
    items,
  )
  cart.shippingPrice = 0
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice)).toFixed(2)

  const steps = [
    { to: '/shipping', label: 'Shipping', active: 'active' },
    { to: '/payment', label: 'Payment', active: 'active' },
    { to: '/placeorder', label: 'Complete Order ', active: 'active' },
  ]

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order.id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    if (!cart.loaded) {
      dispatch(updateCart())
    }
    setCountry(cart.shippingAddress.country)
    setPostalCode(cart.shippingAddress.postalCode)
    setCity(cart.shippingAddress.city)
    setAddress(cart.shippingAddress.address)
  }, [history, success, dispatch, cart, order])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        token: userInfo.token,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }),
    )
  }

  if (!cart.cartItems) {
    cart.cartItems = []
  }

  return (
    <Layout>
      <SEO title='Order'/>
      <section className='place-order'>
        <CheckoutSteps steps={steps}/>
        <div className="place-order__inner">
          <div className="place-order__left">
            <div className="place-order__shipping">
              <h3 className='place-order__shipping__title'>Shipping</h3>
              <p className='place-order__shipping__text'>
                <strong>Address: </strong>
                {address}, {' '}
                {city} {' '}
                {postalCode},{' '}
                {country}
              </p>
            </div>
            <div className="place-order__payment">
              <h3 className='place-order__payment__title'>Payment Method</h3>
              <p className='place-order__payment__text'>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
            <div className="place-order__cart">
              <h3 className='place-order__cart__title'>Order Items</h3>
              <div className="place-order__cart__list">
                {cart.cartItems.map((item, index) => (
                  <div className="place-order__cart__item" key={index}>
                    <img className='place-order__cart__item__image' src={item.image} alt={item.name}/>
                    <div className="place-order__cart__item__info">
                      <Link to={`/product/${item.slug}`} className='place-order__cart__item__name'>{item.name}</Link>
                      <p className='place-order__cart__item__qty'>Quantity: {item.qty}</p>
                    </div>
                    <p className='place-order__cart__item__price'>${item.qty * item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="place-order__right">
            <div className="place-order__summary">
              <h3 className='place-order__summary__title'>Order Summary</h3>
              <div className="place-order__summary__item">
                <p className="place-order__summary__item__name">{items > 1 ? items + ' Items' : items + ' Item'}</p>
                <p className="place-order__summary__item__value">${price.toFixed(2)}</p>
              </div>
              <div className="place-order__summary__item">
                <p className="place-order__summary__item__name">Shipping</p>
                <p className="place-order__summary__item__value">${cart.shippingPrice}</p>
              </div>
              <div className="place-order__summary__item place-order__summary__item--total">
                <p className="place-order__summary__item__name">Total</p>
                <p className="place-order__summary__item__value">${price.toFixed(2)}</p>
              </div>
              <button onClick={placeOrderHandler} className='place-order__summary__button'>Place Order</button>
              {error && <Message variant='error'>{error}</Message>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PlaceOrderPage