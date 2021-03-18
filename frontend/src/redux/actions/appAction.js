import { MOBILE_NAVIGATION_MENU } from './actionTypes'

export const toggleMenu = (visible) => async (dispatch) => {
    dispatch({
        type: MOBILE_NAVIGATION_MENU,
        payload: visible,
    })
}