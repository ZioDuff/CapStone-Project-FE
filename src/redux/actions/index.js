import axios from "axios"

export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED"
export const TOGGLE_AUTHORITY = "TOGGLE_AUTHORITY"
export const REGISTERED_USER = "REGISTERED_USER"
export const GET_USER_LOGGED_PROFILE = "GET_USER_LOGGED_PROFILE"
export const GET_USER_LOGGED_TOKEN = "GET_USER_LOGGED_TOKEN"
export const GET_CLIENT = "GET_CLIENT"

const URL = "https://distant-roundworm-jacopo-de-maio-1e685948.koyeb.app/"

export const loginUserAction = (loginObj, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL + "auth/login", loginObj)
      dispatch({
        type: GET_USER_LOGGED_TOKEN,
        payload: response.data,
      })
      console.log(response.data)
      navigate("/")
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const registerUserAction = (registerObj) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL + "auth/register", registerObj)
      dispatch({
        type: REGISTERED_USER,
      })
      console.log(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }
}
