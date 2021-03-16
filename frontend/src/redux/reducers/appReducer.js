import {HIDE_MOBILE_NAVIGATION_MENU, SHOW_MOBILE_NAVIGATION_MENU} from "../actions/actionTypes"

const initialState = {
  visibleMobileMenu: false
}


export const AppReducer = (state = initialState, action) => {
  switch(action.type) {
    case SHOW_MOBILE_NAVIGATION_MENU:
      return { ...state, visibleMobileMenu: true }
    case HIDE_MOBILE_NAVIGATION_MENU:
      return { ...state, visibleMobileMenu: false }
    default:
      return state;
  }
}