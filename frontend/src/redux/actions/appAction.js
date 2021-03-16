import {HIDE_MOBILE_NAVIGATION_MENU, SHOW_MOBILE_NAVIGATION_MENU} from "./actionTypes"

export function showMobileNavigationMenu() {
    return {
        type: SHOW_MOBILE_NAVIGATION_MENU,
    }
}

export function hideMobileNavigationMenu() {
    return {
        type: HIDE_MOBILE_NAVIGATION_MENU,
    }
}