import axios from '../../axios/axios'
import {
  PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_VIEW,
} from './actionTypes'

export const viewProducts = (view) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_VIEW,
    payload: view,
  })
}

export const listProducts = (sort = null) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    if (!sort) {
      const query = `
          query {
            getProducts {
             id, name, image, price 
            }
          }`
      const { data } = await axios.post('/public-api', { query: query })
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data.getProducts,
      })
    } else {
      const query = `
          query {
            getSortProducts(sort: "${sort}") {
             id, name, image, price 
            }
          }`
      const { data } = await axios.post('/public-api', { query: query })

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data.getSortProducts,
      })
    }

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.errors[0].message
          ? error.response.data.errors[0].message
          : error.message,
    })
  }
}

export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const query = `
          query {
            getProductById(id: "${id}") {
             id, name, image, price description
            }
          }`
    const { data } = await axios.post('/public-api', { query: query })
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data.getProductById,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.errors[0].message
          ? error.response.data.errors[0].message
          : error.message,
    })
  }
}