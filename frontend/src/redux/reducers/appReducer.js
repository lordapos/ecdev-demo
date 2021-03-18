import { MOBILE_NAVIGATION_MENU } from '../actions/actionTypes'

export const AppReducer = (state = { visibleMobileMenu: false }, action) => {
  switch (action.type) {
    case MOBILE_NAVIGATION_MENU:
      return { ...state, visibleMobileMenu: action.payload }
    default:
      return state
  }
}