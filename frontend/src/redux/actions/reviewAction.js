import axios from '../../axios/axios'
import { REVIEW_FAIL, REVIEW_REQUEST, REVIEW_SUCCESS } from './actionTypes'

export const addReview = ({ rating, title, review, name, email, productId }) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_REQUEST,
    })
    const query = `
          mutation {
            addReview(data: {name: "${name}", email: "${email}", title: "${title}", review: "${review}", rating: ${rating}, productId: ${productId}})
          }`
    await axios.post('/public-api', { query: query })
    dispatch({
      type: REVIEW_SUCCESS,
    })
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
      ? error.response.data.errors[0].message
      : error.message
    dispatch({
      type: REVIEW_FAIL,
      payload: message ? message : error.message,
    })
  }
}