import axios from '../../axios/axios'
import {
  ORDER_LIST_MY_RESET, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from './actionTypes'

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const query = `
          mutation {
            createUser(email: "${email}", password: "${password}", name: "${name}") {
             token, email, name
            }
          }`

    const { data } = await axios.post('/public-api', { query: query })

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.data.createUser,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data.createUser,
    })

    localStorage.setItem('userInfo', JSON.stringify(data.data.createUser))
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
      ? error.response.data.errors[0].message
      : error.message
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: message ? message : error.message,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const query = `
          mutation {
            login(email: "${email}", password: "${password}") {
             token, email, name
            }
          }`
    const { data } = await axios.post('/public-api', { query: query })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data.login,
    })

    localStorage.setItem('userInfo', JSON.stringify(data.data.login))
  } catch (error) {
    const message = error.response && error.response.data.errors[0].message
      ? error.response.data.errors[0].message
      : error.message
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message ? message : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
}

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          query {
            getUserProfile(token: "${userInfo.token}") {
             email, name
            }
          }`
    const { data } = await axios.post('/logged-api', { query: query }, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.data.getUserProfile,
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
      type: USER_DETAILS_FAIL,
      payload: 'Not authorized, token failed',
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          mutation {
            updateUserProfile(data: {token: "${userInfo.token}", name: "${user.name}", email: "${user.email}", password: "${user.password}"}) {
             email, name, token
            }
          }`

    const { data } = await axios.post('/logged-api', { query: query }, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.data.updateUserProfile,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data.updateUserProfile,
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.data.updateUserProfile,
    })
    const storage = { token: data.data.updateUserProfile.token }
    localStorage.setItem('userInfo', JSON.stringify(storage))
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: 'Not authorized, token failed',
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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
            getUsers {
              id, name, email
            }
          }
    `
    const { data } = await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.data.getUsers,
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
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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
        mutation {
          deleteUser(id: "${id}")
        }
      `
    await axios.post('/admin-api', { query: query }, config)

    dispatch({ type: USER_DELETE_SUCCESS })
    listUsers()
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors[0].message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const getUserAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          query {
            getUserProfile(id: ${id}) {
             email, name, id
            }
          }`
    const { data } = await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.data.getUserProfile,
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
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateUserAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const query = `
          mutation {
            updateUser(data: {id: ${user.id}, name: "${user.name}", email: "${user.email}", password: "${user.password}"}) {
             email, name, id
            }
          }`

    const { data } = await axios.post('/admin-api', { query: query }, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data.data.updateUser,
    })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.data.updateUser,
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
      type: USER_UPDATE_PROFILE_FAIL,
      payload: 'Not authorized, token failed',
    })
  }
}