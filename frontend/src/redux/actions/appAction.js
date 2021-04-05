import { MOBILE_NAVIGATION_MENU, REVIEW_POPUP } from './actionTypes'

export const toggleMenu = (visible) => async (dispatch) => {
    dispatch({
        type: MOBILE_NAVIGATION_MENU,
        payload: visible,
    })
}

export const toggleReviewPopup = (visible) => async (dispatch) => {
    dispatch({
        type: REVIEW_POPUP,
        payload: visible
    })
}