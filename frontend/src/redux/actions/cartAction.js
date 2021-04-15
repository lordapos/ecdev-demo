import axios from '../../axios/axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_UPDATE_ITEM,
} from './actionTypes'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const query = `
          query {
            getProductById(id: "${id}") {
             id, name, image, price, slug
            }
          }`
    const {data} = await axios.post('/public-api', {query: query})
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.data.getProductById.id,
        slug: data.data.getProductById.slug,
        name: data.data.getProductById.name,
        image: data.data.getProductById.image,
        price: data.data.getProductById.price,
        qty
      }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (e) {
    console.log(e)
  }
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

const queryfy = obj => {
  if( typeof obj === 'number' ) {
    return obj;
  }

  if( typeof obj !== 'object' || Array.isArray( obj ) ) {
    return JSON.stringify( obj );
  }
  let props = Object.keys( obj ).map( key =>
    `${key}:${queryfy( obj[key] )}`
  ).join( ', ' );

  return `{${props}}`;
}

export const updateCart = () => async (dispatch, getState) => {
  try {
    const {
      cart: { cartItems },
    } = getState()

    let products = ''
    cartItems.forEach(item => {
      products += queryfy(item)+','
    })

    products = products.slice(0, -1)

    const query = `
          query {
            updateCart(items: [${products}]) {
             id, name, image, price, qty, slug
            }
          }`
    const {data} = await axios.post('/public-api', {query: query})
    dispatch({
      type: CART_UPDATE_ITEM,
      payload: data.data.updateCart,
    })
    localStorage.setItem('cartItems', JSON.stringify(data.data.updateCart))
  } catch (e) {
    console.log(e)
  }
}