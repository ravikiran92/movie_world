import { createSlice } from '@reduxjs/toolkit';

const MovieSlice = createSlice({
    name: 'movies',
    initialState: {
        allMovies: [],
        watchlist: [],
        favorite: []
    },
    reducers: {
        setAllMovies: (state, action) => {
            state.allMovies = action.payload
        },
        setWatchList: (state, action) => {
            state.watchlist.push(action.payload);
        },
        removeFromWatchList: (state, action) => {
            state.watchlist = state.watchlist.filter((item) => item.id !== action.payload);
        },
        setFavorite: (state, action) => {
            state.favorite.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorite = state.favorite.filter((item) => item.id !== action.payload);
        }
    },
});

export const { setWatchList, setFavorite, removeFromFavorites, removeFromWatchList,setAllMovies } = MovieSlice.actions;
export default MovieSlice.reducer;
