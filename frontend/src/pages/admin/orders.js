import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../components/Layout/AdminLayout'
import SEO from '../../components/Seo'
import Message from '../../components/Message/Message'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { listOrders } from '../../redux/actions/orderAction'

const OrdersPage = () => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  useEffect(() => {
    dispatch(listOrders())
  },[dispatch])

  const toDate = (val) => {
    return new Date(+val).toLocaleString();
  }

  const renderOrders = (items) => {
    return items.map((order, index) => {
      return (
        <li key={index} className='profile__orders__item'>
          <div className='profile__orders__item__tab'>
            <h6>{toDate(order.createdAt)}</h6>
          </div>
          <div className='profile__orders__item__tab'>
            <h6>{order.totalPrice}$</h6>
          </div>
          <div className='profile__orders__item__tab'>
            <h6>
              {order.paidAt ? (
                order.paidAt
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>
              )}
            </h6>
          </div>
          <div className='profile__orders__item__tab'>
            <h6>
              {order.isDelivered ? (
                order.deliveredAt
              ) : (
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>
              )}
            </h6>
          </div>
          <div className='profile__orders__item__tab'>
            <Link className='profile__orders__item__link' to={`/admin/order/${order.id}`}>
              <FontAwesomeIcon
                icon={faEdit}/>
            </Link>
          </div>
        </li>
      )
    })
  }

  return (
    <AdminLayout>
      <h1>Orders</h1>
      <SEO title='Orders' />
      {loading ? (
        ''
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
        <ul className='profile__orders__list'>
          <li className='profile__orders__item profile__orders__item--head'>
            <div className='profile__orders__item__tab'>
              <h6>DATE</h6>
            </div>
            <div className='profile__orders__item__tab'>
              <h6>TOTAL</h6>
            </div>
            <div className='profile__orders__item__tab'>
              <h6>PAID</h6>
            </div>
            <div className='profile__orders__item__tab'>
              <h6>DELIVERED</h6>
            </div>
            <div className='profile__orders__item__tab'> </div>
          </li>
          {renderOrders(orders)}
        </ul>
        )}
    </AdminLayout>
  )
}

export default OrdersPage