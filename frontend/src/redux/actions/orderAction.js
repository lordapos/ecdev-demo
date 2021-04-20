import axios from '../../axios/axios'
import {
  CART_CLEAR_ITEMS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from './actionTypes'
import { logout } from './userAction'

const queryfy = obj => {

  if (typeof obj === 'number') {
    return obj
  }

  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj)
  }

  let props = Object.keys(obj).map(key =>
    `${key}:${queryfy(obj[key])}`,
  ).join(', ')

  return `{${props}}`
}

export const createOrder = (order) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let products = ''
    order.orderItems.forEach(item => {
      products += queryfy(item) + ','
    })

    products = products.slice(0, -1)

    const query = `
          mutation {
            createOrder(token: "${order.token}", shippingAddress: ${queryfy(
      order.shippingAddress)}, paymentMethod: "${order.paymentMethod}", shippingPrice: ${order.shippingPrice}, totalPrice: ${order.totalPrice}, orderItems: [${products}]) {
             id
            }
          }`

    const { data } = await axios.post('/logged-api', { query: query }, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.data.createOrder,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data.data.createOrder,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          query {
            getOrder(id: ${id},token: "${userInfo.token}") {
             id, userId, orderItems, shippingAddress, paymentMethod, paymentResult, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt
            }
          }`

    const { data } = await axios.post('/logged-api', { query: query }, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data.getOrder,
    })
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          mutation {
            updateOrderToPaid(id: ${orderId}, data: ${queryfy(paymentResult)}) {
             id, userId, orderItems, shippingAddress, paymentMethod, paymentResult, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt
            }
          }`

    const { data } = await axios.post('/logged-api', { query: query }, config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data.data.updateOrderToPaid,
    })
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data.updateOrderToPaid,
    })
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          query {
            getMyOrders(token: "${userInfo.token}") {
             createdAt, totalPrice, paidAt, isDelivered, id
            }
          }`
    const { data } = await axios.post('/logged-api', { query: query }, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.data.getMyOrders,
    })
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
      ? error.response.data.errors[0].message
      : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}