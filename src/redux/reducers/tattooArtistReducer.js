import {
  FETCH_SINGLE_TATTOO_ARTIST_SUCCESS,
  FETCH_TATTOO_ARTISTS_FAILURE,
  FETCH_TATTOO_ARTISTS_REQUEST,
  FETCH_TATTOO_ARTISTS_SUCCESS,
} from "../actions"

const initialState = {
  tattooArtists: [],
  singleTattooArtist: {},
  loading: false,
  error: null,
}
const tattooArtistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TATTOO_ARTISTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_SINGLE_TATTOO_ARTIST_SUCCESS:
      return {
        ...state,
        singleTattooArtist: action.payload,
      }
    case FETCH_TATTOO_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tattooArtists: action.payload,
      }
    case FETCH_TATTOO_ARTISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
export default tattooArtistReducer
