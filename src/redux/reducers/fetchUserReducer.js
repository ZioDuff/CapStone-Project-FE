import {
  GET_USER_LOGGED_PROFILE,
  GET_USER_LOGGED_TOKEN,
  IS_ADMIN,
  REGISTERED_USER,
  RESET_STATE,
  RUN_LOADING,
  STOP_LOADING,
  TOGGLE_IS_LOGGED,
  UPDATE_USER_AVATAR,
  UPDATE_USER_EMAIL,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
} from "../actions"

const initialState = {
  isLogged: false,
  isAdmin: false,
  isRegistered: false,
  isLoading: false,
  user_bearer: "",
  user_info: {},
}

const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUN_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }

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
      }
    case IS_ADMIN:
      return {
        ...state,
        isAdmin: true,
      }
    case RESET_STATE:
      return {
        ...initialState,
      }
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        user_info: {
          ...state.user_info,
          avatarURL: action.payload,
        },
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        user_info: {
          ...state.user_info,
          ...action.payload,
        },
      }
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        user_info: {
          ...state.user_info,
          email: action.payload,
        },
      }
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        user_info: {
          ...state.user_info,
          password: action.payload,
        },
      }

    default:
      return state
  }
}

export default fetchUserReducer
