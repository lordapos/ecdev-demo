import { combineReducers } from 'redux'
import { AppReducer } from './appReducer'
import { productListReducer, productViewReducer } from './productReducer'

export default combineReducers({
  app: AppReducer,
  productView: productViewReducer,
  productList: productListReducer,
})