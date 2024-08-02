import fetchUserReducer from "../reducers/fetchUserReducer"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import tattooArtistReducer from "../reducers/tattooArtistReducer"
import tattooReducer from "../reducers/tattooReducer"
import reservationReducer from "../reducers/reservationReducer"

const rootReducer = combineReducers({
  user: fetchUserReducer,
  tattooArtist: tattooArtistReducer,
  tattoo: tattooReducer,
  reservations: reservationReducer,
})

const store = configureStore({
  reducer: rootReducer,
})
export default store
