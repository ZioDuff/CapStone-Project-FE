import fetchUserReducer from "../reducers/fetchUserReducer"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import tattooArtistReducer from "../reducers/tattooArtistReducer"

const rootReducer = combineReducers({
  user: fetchUserReducer,
  tattooArtist: tattooArtistReducer,
})

const store = configureStore({
  reducer: rootReducer,
})
export default store
