import {
  PRODUCT_DETAILS_CLEAN,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
} from '../actions/actionTypes'

export const productListReducer = (state = { products: [], url: null }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, url: action.url }
    case PRODUCT_LIST_RESET:
      return { products: [], url: null }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload, url: null }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAILS_CLEAN:
      return { loading: true, product: {} }
    default:
      return state
  }
}