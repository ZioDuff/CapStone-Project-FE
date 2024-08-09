import {
  CLEAR_ERROR,
  SET_ERROR_REGISTRATION,
  SET_ERROR_LOGIN,
  SET_ERROR_TATTOSESSION,
  SET_ERROR_CONSULTATION,
} from "../actions"

const initialState = {
  errorLogin: null,
  errorRegistration: null,
  errorTattooSession: null,
  errorConsultation: null,
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
    case SET_ERROR_TATTOSESSION:
      return {
        ...state,
        errorTattooSession: action.payload,
      }
    case SET_ERROR_CONSULTATION:
      return {
        ...state,
        errorConsultation: action.payload,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        errorLogin: null,
        errorRegistration: null,
        errorTattooSession: null,
        errorConsultation: null,
      }
    default:
      return state
  }
}

export default errorReducer
