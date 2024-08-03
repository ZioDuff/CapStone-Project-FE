import fetchUserReducer from "../reducers/fetchUserReducer"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import tattooArtistReducer from "../reducers/tattooArtistReducer"
import tattooReducer from "../reducers/tattooReducer"
import reservationReducer from "../reducers/reservationReducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import encryptTransform from "redux-persist-transform-encrypt"

const rootReducer = combineReducers({
  user: fetchUserReducer,
  tattooArtist: tattooArtistReducer,
  tattoo: tattooReducer,
  reservations: reservationReducer,
})

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_APP_PERSIST_KEY,
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
