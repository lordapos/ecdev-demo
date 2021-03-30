import { MOBILE_NAVIGATION_MENU, REVIEW_POPUP, YOUTUBE_POPUP } from './actionTypes'

export const toggleMenu = (visible) => async (dispatch) => {
    dispatch({
        type: MOBILE_NAVIGATION_MENU,
        payload: visible,
    })
}

export const togglePopup = (visible) => async (dispatch) => {
    dispatch({
        type: REVIEW_POPUP,
        payload: visible
    })
}

export const toggleYoutubePopup = (visible) => async (dispatch) => {
    dispatch({
        type: YOUTUBE_POPUP,
        payload: visible
    })
}