import {
  CLEAR_ERROR,
  SET_ERROR_REGISTRATION,
  SET_ERROR_LOGIN,
} from "../actions"

const initialState = {
  errorLogin: null,
  errorRegistration: null,
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_LOGIN:
      return {
        ...state,
        errorLogin: action.payload,
      }
    case SET_ERROR_REGISTRATION:
      return {
        ...state,
        errorRegistration: action.payload,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export default errorReducer
