import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Slice/AuthSlice'
import MovieReducer from './Slice/MovieSlice'

export const store = configureStore({
    reducer: {
        User: AuthReducer,
        Movie: MovieReducer
    },
})