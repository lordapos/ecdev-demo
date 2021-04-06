import axios from '../../axios/axios'
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS,
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

export const listSortProducts = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { sort: { sorting } } = getState()
    const arrBrand = []
    if (sorting.brands.length > 0) {
      sorting.brands.forEach(item => {
        arrBrand.push(item.id)
      })
    }

    if (sorting.sortBy || sorting.price || (sorting.brands && sorting.brands.length > 0)) {
      const query = `
          query {
            getSortProducts(sort: {sortBy: "${sorting.sortBy}", price: ${sorting.price}, brands: [${arrBrand}]}, category: "${category}") {
             id, name, image,images, price, rating, numReviews, slug, categoryId
            }
          }`
      const { data } = await axios.post('/public-api', { query: query })
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data.getSortProducts,
        url: window.location.href,
      })
    } else {
      const query = `
        query {
          getCatProducts(category: "${category}") {
           id, name, image, images, price, rating, numReviews, slug, categoryId
          }
        }`
      const { data } = await axios.post('/public-api', { query: query })
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data.getCatProducts,
        url: window.location.href,
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
            getProductBySlug(slug: "${id}") {
             id, name, image,images, price, description, rating, numReviews, brandId, sku, highlights, specs, youtubeEmbed, review, slug 
            }
          }`
    const { data } = await axios.post('/public-api', { query: query })
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data.getProductBySlug,
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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
        mutation {
          deleteProduct(id: "${id}")
        }
      `
    await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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
          updateProduct(data: ${queryfy(product)}) {
            id, name, image,images, price, description, rating, numReviews, brandId, sku, highlights, specs, youtubeEmbed 
          }
        }
      `
    const { data } = await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data.data.updateProduct,
    })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data.updateProduct })
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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
        mutation {
          addProduct(data: ${queryfy(product)}) {
            id, name, image,images, price, description, rating, numReviews, brandId, sku, highlights, specs, youtubeEmbed 
          }
        }
      `
    const { data } = await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.data.addProduct,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    })
  }
}