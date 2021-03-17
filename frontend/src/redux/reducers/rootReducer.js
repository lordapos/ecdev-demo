import { combineReducers } from 'redux'
import { AppReducer } from './appReducer'
import { productListReducer, productViewReducer } from './productReducer'
import { cartReducer } from './cartReducer'

export default combineReducers({
  app: AppReducer,
  productView: productViewReducer,
  productList: productListReducer,
  cart: cartReducer,
})