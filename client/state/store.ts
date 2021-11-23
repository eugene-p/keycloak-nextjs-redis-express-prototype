import { configureStore } from '@reduxjs/toolkit'
import vehicalesReducer from './slices/Vehicales'

const store = configureStore({
  reducer: {
    vehicales: vehicalesReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch