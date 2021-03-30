import { REVIEW_POPUP, MOBILE_NAVIGATION_MENU, YOUTUBE_POPUP } from '../actions/actionTypes'

export const AppReducer = (state = { visibleMobileMenu: false, visiblePopupForm: false, visibleYoutubePopupForm : false }, action) => {
  switch (action.type) {
    case MOBILE_NAVIGATION_MENU:
      return { ...state, visibleMobileMenu: action.payload }
    case REVIEW_POPUP:
      return {...state, visiblePopupForm: action.payload}
    case YOUTUBE_POPUP:
      return {...state, visibleYoutubePopupForm: action.payload}
    default:
      return state
  }
}