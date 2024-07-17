import fetchUserReducer from "../reducers/fetchUserReducer"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  user: fetchUserReducer,
})

const store = configureStore({
  reducer: rootReducer,
})
export default store
