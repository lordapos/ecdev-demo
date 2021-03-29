import { REVIEW_POPUP, MOBILE_NAVIGATION_MENU } from '../actions/actionTypes'

export const AppReducer = (state = { visibleMobileMenu: false, visiblePopupForm: false }, action) => {
  switch (action.type) {
    case MOBILE_NAVIGATION_MENU:
      return { ...state, visibleMobileMenu: action.payload }
    case REVIEW_POPUP:
      return {...state, visiblePopupForm: action.payload}
    default:
      return state
  }
}