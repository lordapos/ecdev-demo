import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/Layout/AdminLayout'
import SEO from '../../components/Seo'
import Message from '../../components/Message/Message'
import { Link } from 'gatsby'
import {
  deliverOrder,
  getOrderDetailsAdmin,
} from '../../redux/actions/orderAction'
import {
  ORDER_DETAILS_RESET,
  USER_DETAILS_RESET,
} from '../../redux/actions/actionTypes'
import { getUserAdmin } from '../../redux/actions/userAction'

const OrderPage = ({ location }) => {
  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { success: successDeliver } = orderDeliver

  const userDetails = useSelector((state) => state.userDetails)
  const { loading: UserLoading, error: UserError, user } = userDetails

  useEffect(() => {
    const orderId = location.pathname.split('/')[3]
    dispatch(getOrderDetailsAdmin(orderId))

    return () => {
      dispatch({ type: ORDER_DETAILS_RESET })
    }
  }, [dispatch, successDeliver, location])

  useEffect(() => {
    if (order.userId) {
      dispatch(getUserAdmin(order.userId))
    }
    return () => {
      dispatch({ type: USER_DETAILS_RESET})
    }
  }, [dispatch, order])

  const deliverHandler = () => {
    dispatch(deliverOrder(order.id))
  }

  return (
    <AdminLayout>
      <SEO title='Order'/>
      <h1>Order</h1>
      {loading ?
        '' :
        error ? (<Message variant='error'>{error}</Message>) : (
          <section className='order'>
            <div className="order__inner order__inner--admin">
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
                <div className="order__user">
                  <h3>Customer Details</h3>
                  {UserLoading ? '' :
                    UserError ? (<Message variant='error'>{UserError}</Message>) : (
                      <div className='order__user__text'>
                        <strong>name: </strong> {user.name} <br/>
                        <strong>email: </strong> {user.email}
                      </div>
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
                  <div
                    className="order__summary__item order__summary__item--total">
                    <p className="order__summary__item__name">Total</p>
                    <p className="order__summary__item__value">${order.totalPrice}</p>
                  </div>
                  {order.isPaid &&
                  !order.isDelivered && (
                    <div className='order__payment-btns'>
                      <button
                        className='order__deliver-btn'
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
    </AdminLayout>
  )
}

export default OrderPage