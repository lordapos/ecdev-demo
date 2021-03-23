import { BRAND_FAIL, BRAND_REQUEST, BRAND_SUCCESS } from '../actions/actionTypes'

export const brandReducer = (state = { brands: null }, action ) => {
  switch (action.type) {
    case BRAND_REQUEST:
      return { brandLoading: true, ...state }
    case BRAND_SUCCESS:
      return { brandLoading: false, brands: action.payload }
    case BRAND_FAIL:
      return { brandLoading: false, error: action.payload }
    default:
      return state
  }
}