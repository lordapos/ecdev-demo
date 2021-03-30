import { REVIEW_POPUP, MOBILE_NAVIGATION_MENU, YOUTUBE_POPUP } from '../actions/actionTypes'

export const AppReducer = (state = { visibleMobileMenu: false, visibleReviewPopupForm: false, visibleYoutubePopupForm : false }, action) => {
  switch (action.type) {
    case MOBILE_NAVIGATION_MENU:
      return { ...state, visibleMobileMenu: action.payload }
    case REVIEW_POPUP:
      return {...state, visibleReviewPopupForm: action.payload}
    case YOUTUBE_POPUP:
      return {...state, visibleYoutubePopupForm: action.payload}
    default:
      return state
  }
}