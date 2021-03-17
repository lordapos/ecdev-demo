import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import SEO from '../../components/Seo'
import { Link, navigate } from 'gatsby'
import { getOrderDetails, payOrder } from '../../redux/actions/orderAction'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import {
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from '../../redux/actions/actionTypes'
import axios from '../../axios/axios'
import { PayPalButton } from 'react-paypal-button-v2'
import './_order.scss'

const OrderPage = ({ location }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const orderId = location.pathname.split('/')[2]
    dispatch(getOrderDetails(orderId))

  }, [dispatch, userInfo, location])

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_DETAILS_RESET })
    }
  }, [dispatch])

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order])

  useEffect(() => {//
    if (successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
    }
  }, [successPay, successDeliver, dispatch])

  const successPaymentHandler = (paymentResult) => {
    const orderId = location.pathname.split('/')[2]
    const result = {
      id: paymentResult.id,
      status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.payer.email_address,
    }
    dispatch(payOrder(orderId, result))
  }

  return (
    <Layout>
      <SEO title={'Order'}/>
      {loading ?
        <h6>Loading... <Loader/></h6> :
        error ? (<Message variant='error'>{error}</Message>) : (
          <section className='order'>
            <div className="order__inner">
              <div className="order__left">
                <div className="order__shipping">
                  <h3 className='order__shipping__title'>Shipping</h3>
                  <p className='order__shipping__text'>
                    <strong>Address: </strong>
                    {Object.values(JSON.parse(order.shippingAddress)).join(' ')}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='error'>Not Delivered</Message>
                  )}
                </div>
                <div className="order__payment">
                  <h3 className='order__payment__title'>Payment Method</h3>
                  <p className='order__payment__text'>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant='error'>Not Paid</Message>
                  )}
                </div>
                <div className="order__cart">
                  <h3 className='order__cart__title'>Order Items</h3>
                  <div className="order__cart__list">
                    {JSON.parse(order.orderItems).map((item, index) => (
                      <div className="order__cart__item" key={index}>
                        <img className='order__cart__item__image' src={item.image} alt={item.name}/>
                        <div className="order__cart__item__info">
                          <Link to={`/product/${item.product}`} className='order__cart__item__name'>{item.name}</Link>
                          <p className='order__cart__item__qty'>Quantity: {item.qty}</p>
                        </div>
                        <p className='order__cart__item__price'>${item.qty * item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order__right">
                <div className="order__summary">
                  <h3 className='order__summary__title'>Order Summary</h3>
                  <div className="order__summary__item">
                    <p className="order__summary__item__name">Shipping</p>
                    <p className="order__summary__item__value">${order.shippingPrice}</p>
                  </div>
                  <div className="order__summary__item order__summary__item--total">
                    <p className="order__summary__item__name">Total</p>
                    <p className="order__summary__item__value">${order.totalPrice}</p>
                  </div>
                  {!order.isPaid && (
                    <div className='order__payment-btns'>
                      {!sdkReady ? (
                        <Loader/>
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                      {loadingPay && <Loader/>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
    </Layout>
  )
}

export default OrderPage