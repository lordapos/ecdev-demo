import axios from '../../axios/axios'
import {
  PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from './actionTypes'

export const listSortProducts = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { sort: { sorting } } = getState()
    const arrBrand = []
    if (sorting.brands && sorting.brands.length > 0) {
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