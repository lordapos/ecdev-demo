import { combineReducers } from 'redux'
import { AppReducer } from './appReducer'
import { productDetailsReducer, productListReducer, productViewReducer } from './productReducer'
import { cartReducer } from './cartReducer'

export default combineReducers({
  app: AppReducer,
  productView: productViewReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})