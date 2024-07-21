import {
  GET_USER_LOGGED_PROFILE,
  GET_USER_LOGGED_TOKEN,
  REGISTERED_USER,
  TOGGLE_AUTHORITY,
  TOGGLE_IS_LOGGED,
} from "../actions"

const initialState = {
  isLogged: false,
  isAdmin: false,
  isRegistered: false,
  user_bearer: "",
  user_info: {},
}

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_LOGGED:
      return {
        ...state,
        isLogged: true,
      }
    case GET_USER_LOGGED_TOKEN:
      return {
        ...state,
        user_bearer: action.payload,
      }
    case REGISTERED_USER:
      return {
        ...state,
        isRegistered: true,
      }
    case GET_USER_LOGGED_PROFILE:
      return {
        ...state,
        user_info: action.payload,
        isLogged: true,
      }
    case TOGGLE_AUTHORITY:
      return {
        ...state,
        state: action.payload,
      }
    default:
      return state
  }
}

export default fetchUserReducer
