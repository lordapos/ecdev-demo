import { REVIEW_CLEAN, REVIEW_FAIL, REVIEW_REQUEST, REVIEW_SUCCESS } from '../actions/actionTypes'

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_REQUEST:
      return { loading: true }
    case REVIEW_SUCCESS:
      return { loading: false, success: true }
    case REVIEW_FAIL:
      return { loading: false }
    case REVIEW_CLEAN:
      return {}
    default:
      return state
  }
}