import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState  } from '../store'

export interface env {
  api: {
    host: string
    , port: string
  },
  accessToken: string
}


const initialState: env = {
    api:{
      host: 'localhost'
      , port: '3000'
    }
    , accessToken: ''
}

export const getEnv = (state: RootState) => state.env
export const getAccessToken = (state: RootState) => state.env.accessToken
export const envSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {
      setApi (state:env, action) {
        const {API_PORT, API_HOST} = action.payload

        state.api.host = API_HOST
        state.api.port = API_PORT
      }
      , setAccesssToken (state:env, action) {
        state.accessToken = action.payload
      }
    }
});

export const {setApi, setAccesssToken} = envSlice.actions

export default envSlice.reducer