import { ROLE_FAIL, ROLE_REQUEST, ROLE_SUCCESS } from '../actions/actionTypes'

export const roleReducer = (state = { Roles: null }, action ) => {
  switch (action.type) {
    case ROLE_REQUEST:
      return { roleLoading: true, ...state }
    case ROLE_SUCCESS:
      return { roleLoading: false, Roles: action.payload }
    case ROLE_FAIL:
      return { roleLoading: false, error: action.payload }
    default:
      return state
  }
}