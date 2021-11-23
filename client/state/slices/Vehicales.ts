import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState  } from '../store'

export interface vehicales {
}

const initialState: vehicales = {
}
export const getExperience = (state: RootState) => state.vehicales

export const experienceSlice = createSlice({
    name: 'vehicales',
    initialState,
    reducers: {}
});

export default experienceSlice.reducer