import { SORT_ADD, SORT_RESET } from '../actions/actionTypes'

const initialState = {
  sorting: {
    sortBy: null,
    price: null,
    brands: null,
  },
}
export const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_ADD:
      return { sorting: action.payload }
    case SORT_RESET:
      return initialState
    default:
      return state;
  }
}