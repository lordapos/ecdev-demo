import { combineReducers } from 'redux'
import { AppReducer } from './appReducer'
import { productDetailsReducer, productListReducer, productViewReducer } from './productReducer'
import { cartReducer } from './cartReducer'
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './userReducer'

export default combineReducers({
  app: AppReducer,
  productView: productViewReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
})