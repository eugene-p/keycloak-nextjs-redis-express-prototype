import { configureStore } from '@reduxjs/toolkit'
import vehicalesReducer from './slices/Vehicales'
import envReducer from './slices/Env'

const store = configureStore({
  reducer: {
    vehicales: vehicalesReducer
    , env: envReducer
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch