import {
  FETCH_ALL_TATTOO_SUCCESS,
  STOP_LOADING,
  UPLOAD_TATTOO_FAILURE,
  UPLOAD_TATTOO_REQUEST,
  UPLOAD_TATTOO_SUCCESS,
} from "../actions"

const initialState = {
  isLoading: false,
  error: null,
  singleTattoo: "",
  tattoos: [],
}

const tattooReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case UPLOAD_TATTOO_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case UPLOAD_TATTOO_SUCCESS:
      return {
        ...state,
        singleTattoo: action.payload,
      }
    case UPLOAD_TATTOO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.isError,
      }
    case FETCH_ALL_TATTOO_SUCCESS:
      return {
        ...state,
        tattoos: action.payload,
      }

    default:
      return state
  }
}
export default tattooReducer
