import { logout } from './userAction'
import { ROLE_FAIL, ROLE_REQUEST, ROLE_SUCCESS } from './actionTypes'
import axios from '../../axios/axios'

export const checkRoles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROLE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
      query {
            checkAdminRole(token: "${userInfo.token}") {
              isAdmin, isModerator
            }
          }
    `
    const { data } = await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: ROLE_SUCCESS,
      payload: data.data.checkAdminRole,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ROLE_FAIL,
      payload: message,
    })
  }
}