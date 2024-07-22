import axios from "axios"

export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED"
export const TOGGLE_AUTHORITY = "TOGGLE_AUTHORITY"
export const REGISTERED_USER = "REGISTERED_USER"
export const GET_USER_LOGGED_PROFILE = "GET_USER_LOGGED_PROFILE"
export const GET_USER_LOGGED_TOKEN = "GET_USER_LOGGED_TOKEN"
export const GET_CLIENT = "GET_CLIENT"

export const FETCH_TATTOO_ARTISTS_REQUEST = "FETCH_TATTOO_ARTISTS_REQUEST"
export const FETCH_TATTOO_ARTISTS_SUCCESS = "FETCH_TATTOO_ARTISTS_SUCCESS"
export const FETCH_TATTOO_ARTISTS_FAILURE = "FETCH_TATTOO_ARTISTS_FAILURE"
export const FETCH_SINGLE_TATTOO_ARTIST_SUCCESS =
  "FETCH_SINGLE_TATTOO_ARTIST_SUCCESS"

const URL = "https://imperial-chandra-jacopo-b7942b29.koyeb.app/"

export const loginUserAction = (loginObj, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL + "auth/login", loginObj)
      dispatch({
        type: GET_USER_LOGGED_TOKEN,
        payload: response.data,
      })
      localStorage.setItem("Bearer", JSON.stringify(response.data.accessToken))
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

export const fetchUserInfoAction = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL + "generics/me", {
        headers: { Authorization: "Bearer " + token },
      })
      dispatch({
        type: GET_USER_LOGGED_PROFILE,
        payload: response.data,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchRegisterTattooArtistAction = (token, registerObj) => {
  return async () => {
    try {
      const response = await axios.post(
        URL + "generics/enroll/tattooArtist",
        registerObj,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      console.log(response)
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchTattooArtistsAction = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TATTOO_ARTISTS_REQUEST })
    try {
      const response = await axios.get(URL + "tattooArtists")
      dispatch({
        type: FETCH_TATTOO_ARTISTS_SUCCESS,
        payload: response.data.content,
      })
      console.log(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchSingleTattooArtistAction = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL + `tattooArtists/${id}`)
      dispatch({
        type: FETCH_SINGLE_TATTOO_ARTIST_SUCCESS,
        payload: response.data,
      })
      console.log(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }
}
