import { ADD_RESERVATION, GET_RESERVATION, STOP_LOADING } from "../actions"

const initialState = {
  reservations: [],
  isLoading: false,
}

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESERVATION:
      return {
        ...state,
        isLoading: true,
        reservations: action.payload,
      }
    case GET_RESERVATION:
      return {
        ...state,
        isLoading: true,
        reservations: action.payload,
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
export default reservationReducer
