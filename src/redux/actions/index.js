import axios from "axios"

export const TOGGLE_IS_LOGGED = "TOGGLE_IS_LOGGED"
export const TOGGLE_AUTHORITY = "TOGGLE_AUTHORITY"
export const REGISTERED_USER = "REGISTERED_USER"
export const GET_USER_LOGGED_PROFILE = "GET_USER_LOGGED_PROFILE"
export const GET_USER_LOGGED_TOKEN = "GET_USER_LOGGED_TOKEN"
export const IS_ADMIN = "IS_ADMIN"
export const RESET_STATE = "RESET_STATE"
export const UPDATE_USER_AVATAR = "UPDATE_USER_AVATAR"
export const UPDATE_USER_INFO = "UPDATE_USER_INFO"
export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL"
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD"
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE"

export const FETCH_TATTOO_ARTISTS_REQUEST = "FETCH_TATTOO_ARTISTS_REQUEST"
export const FETCH_TATTOO_ARTISTS_SUCCESS = "FETCH_TATTOO_ARTISTS_SUCCESS"
export const FETCH_TATTOO_ARTISTS_FAILURE = "FETCH_TATTOO_ARTISTS_FAILURE"
export const FETCH_SINGLE_TATTOO_ARTIST_SUCCESS =
  "FETCH_SINGLE_TATTOO_ARTIST_SUCCESS"

export const UPLOAD_TATTOO_REQUEST = "UPLOAD_TATTOO_REQUEST"
export const UPLOAD_TATTOO_SUCCESS = "UPLOAD_TATTOO_SUCCESS"
export const UPLOAD_TATTOO_FAILURE = "UPLOAD_TATTOO_FAILURE"
export const FETCH_ALL_TATTOO_SUCCESS = "FETCH_ALL_TATTOO_SUCCESS"

export const ADD_RESERVATION = "ADD_RESERVATION"
export const REMOVE_RESERVATION = "REMOVE_RESERVATION"
export const SET_RESERVATIONS = "SET_RESERVATIONS"

export const SET_ERROR_LOGIN = "SET_ERROR_LOGIN"
export const SET_ERROR_REGISTRATION = "SET_ERROR_REGISTRATION"
export const CLEAR_ERROR = "CLEAR_ERROR"

export const RUN_LOADING = "RUN_LOADING"
export const STOP_LOADING = "STOP_LOADING"

const URL = "https://imperial-chandra-jacopo-b7942b29.koyeb.app/"

export const loginUserAction = (loginObj, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL + "auth/login", loginObj)
      dispatch({
        type: GET_USER_LOGGED_TOKEN,
        payload: response.data,
      })
      localStorage.setItem("Bearer ", JSON.stringify(response.data.accessToken))
      console.log(response.data)
      dispatch({ type: TOGGLE_IS_LOGGED })
      navigate("/")
    } catch (err) {
      console.log(err.response.data.message)
      const errMsg = err.response.data.message
      dispatch({ type: SET_ERROR_LOGIN, payload: errMsg })
    } finally {
      dispatch({ type: STOP_LOADING })
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
      const errMsg = err.response.data.message
      dispatch({ type: SET_ERROR_REGISTRATION, payload: errMsg })
    } finally {
      dispatch({ type: STOP_LOADING })
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
      if (response.data.role === "ADMIN") {
        dispatch({ type: IS_ADMIN })
      }
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
    dispatch({ type: FETCH_TATTOO_ARTISTS_REQUEST })
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

export const fetchDeleteOwnAccountAction = (token, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(URL + `generics/me`, {
        headers: { Authorization: "Bearer " + token },
      })
      alert("Account eliminato con successo")
      dispatch({ type: RESET_STATE })
      navigate("/")
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchDeleteTattooArtistAction = (token, tattooArtistId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        URL + `generics/delete/${tattooArtistId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      alert("Eliminazione avvenuta con successo")
      dispatch({ type: FETCH_TATTOO_ARTISTS_SUCCESS, payload: response.data })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchDeleteOwnTattooAction = (token, tattooId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        URL + `generics/me/tattoo/${tattooId}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      alert("Tatuaggio eliminato con successo")
      dispatch({ type: UPLOAD_TATTOO_REQUEST })
      dispatch({ type: FETCH_ALL_TATTOO_SUCCESS })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchUploadAvatarAction = (token, formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(URL + `generics/me/avatar`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.data)
      dispatch(updateUserAvatar(response.data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const updateUserAvatar = (avatarURL) => {
  return {
    type: UPDATE_USER_AVATAR,
    payload: avatarURL,
  }
}

export const logOutAction = () => {
  localStorage.removeItem("Bearer ")
  return async (dispatch) => {
    dispatch({ type: RESET_STATE })
  }
}

export const fetchUploadTattooAction = (token, formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        URL + "generics/me/newTattoo",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      dispatch({
        type: UPLOAD_TATTOO_SUCCESS,
        payload: response.data,
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchTattoosAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(URL + "tattoos")
      dispatch({
        type: FETCH_ALL_TATTOO_SUCCESS,
        payload: response.data.content,
      })
      console.log(response.data.content)
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchSaveReservationAction = (token, reservationObj) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        URL + "reservations/me",
        reservationObj,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      console.log(response.data)
      dispatch({ type: ADD_RESERVATION, payload: response.data })
      await dispatch(fetchUserInfoAction(token))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchSaveTattooSessionReservationAction = (
  token,
  tattooSessionReservationObj
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        URL + "reservations/tattooSessionRequest/me",
        tattooSessionReservationObj,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      console.log(response.data)
      dispatch({ type: ADD_RESERVATION, payload: response.data })
      await dispatch(fetchUserInfoAction(token))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchDeleteReservationAction = (token, reservationId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        URL + `reservations/me/${reservationId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      console.log("reservation", response)
      alert("Elimazione avvenuta con sucesso")
      await dispatch(fetchUserInfoAction(token))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchUpdateUserInfo = (token, updateForm) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(URL + "generics/me", updateForm, {
        headers: { Authorization: "Bearer " + token },
      })
      console.log(response.data)
      await dispatch({
        type: UPDATE_USER_INFO,
        payload: response.data,
      })
      alert("Modifiche avvenute con successo!")
      await dispatch(fetchUserInfoAction(token))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchUpdateUserEmail = (token, updateEmail) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        URL + "generics/me/email",
        updateEmail,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      console.log(response.data)
      dispatch({
        type: UPDATE_USER_EMAIL,
        payload: response.data,
      })
      alert("Email cambiata con Successo")
      await dispatch(logOutAction())
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const fetchUpdateUserPassword = (token, updatePassword) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        URL + "generics/me/password",
        updatePassword,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      console.log(response.data)
      dispatch({
        type: UPDATE_USER_PASSWORD,
        payload: response.data,
      })
      alert("Password cambiata con successo, verrai rimandato al login")
      await dispatch(logOutAction())
    } catch (err) {
      console.log(err.message)
    }
  }
}
