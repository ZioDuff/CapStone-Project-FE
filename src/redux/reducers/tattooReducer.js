import {
  UPLOAD_TATTOO_FAILURE,
  UPLOAD_TATTOO_REQUEST,
  UPLOAD_TATTOO_SUCCESS,
} from "../actions"

const initialState = {
  isLoading: false,
  error: null,
  tattoos: [],
}

const tattooReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_TATTOO_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case UPLOAD_TATTOO_SUCCESS:
      return {
        ...state,
        tattoos: action.payload,
      }
    case UPLOAD_TATTOO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.isError,
      }
    default:
      return state
  }
}
export default tattooReducer
