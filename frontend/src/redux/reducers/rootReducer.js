import { combineReducers } from 'redux'
import { AppReducer } from './appReducer'
import {
  productDetailsReducer,
  productListReducer,
} from './productReducer'
import { cartReducer } from './cartReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './userReducer'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './orderReducer'
import { brandReducer } from './brandReducer'
import { sortReducer } from './sortReducer'
import { reviewReducer } from './reviewReducer'

export default combineReducers({
  app: AppReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  brands: brandReducer,
  sort: sortReducer,
  review: reviewReducer,
})