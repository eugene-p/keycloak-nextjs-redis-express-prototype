import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { env } from './Env'
import {RootState} from '../store'
import { FeatureCollection } from 'geojson'

export interface vehicales {
    jsonString?: string
    , featureCollection?: FeatureCollection
    , loading: boolean
}

export const fetchVehicles = createAsyncThunk<string, void>(
    'env/fetchVehicles',
    async (_, {getState}):Promise<string> => {
        const state = getState() as {env: env, vehicales: vehicales}
        const {port, host} = state.env.api
        const accessToken = state.env.accessToken
        const jsonString = state.vehicales.jsonString
        console.log(port, host, accessToken)
        if (port && host && accessToken) {
            try {
                const res = await fetch(`http://${host}:${port}/vehicles`, {
                    headers: {
                        'Content-Type': 'application/json'
                        , 'Authorization': 'Bearer ' + accessToken
                    }
                })
                const resText: string = await res.text()
                return resText
            } catch (error) {
                console.log(error)
            }
        }

        return jsonString || ''
    }
)

const initialState: vehicales = {
    jsonString: '',
    loading: false
}

export const getVehicalesString = (state: RootState) => state.vehicales.jsonString
export const getLoading = (state: RootState) => state.vehicales.loading

export const vehicalesSlice = createSlice({
    name: 'vehicales'
    , initialState
    , reducers: {}
    , extraReducers: {
        [fetchVehicles.pending.toString()]: (state) => {
            state.loading = true
        }
        , [fetchVehicles.fulfilled.toString()]: (state, { payload }) => {
            state.jsonString = payload
            try {
                state.featureCollection = JSON.parse(payload)
            } catch(err) {}
            state.loading = false
        }
        , [fetchVehicles.rejected.toString()]: (state) => {
            state.loading = false
        }
    }
});

export default vehicalesSlice.reducer