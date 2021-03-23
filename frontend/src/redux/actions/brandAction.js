import { BRAND_REQUEST, BRAND_SUCCESS, BRAND_FAIL } from './actionTypes'
import axios from '../../axios/axios'

export const getBrand = () => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_REQUEST,
    })

    const query = `
      query {
            getBrands {
              id, name
            }
          }
    `
    const { data } = await axios.post('/public-api', { query: query })

    dispatch({
      type: BRAND_SUCCESS,
      payload: data.data.getBrands,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    dispatch({
      type: BRAND_FAIL,
      payload: message,
    })
  }
}