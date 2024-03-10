import axios from "axios";
import { pool } from "../Utils/pool";

const getMovieCategories = () => axios.get(pool.base_url + pool.paths.movieCategory, {
    params: { page: '1 ' },
    headers: {
        Authorization: pool.accessToken
    }
})

const getTrendingMovies = () => axios.get(pool.base_url + pool.paths.trendingMovie, {
    params: { language: 'en-US' },
    headers: {
        Authorization: pool.accessToken
    }
})

const serachMovies = (query) => axios.get(pool.base_url + pool.paths.serachMovie + "?query=" + query, {
    params: { language: 'en-US', page: '1' },
    headers: {
        Authorization: pool.accessToken
    }
})

const getAllMovies = (query) => axios.get(pool.base_url + pool.paths.allMovies, {
    params: { language: 'en-US', page: '1' },
    headers: {
        Authorization: pool.accessToken
    }
})

const getAllWatchlist = (query) => axios.get(pool.base_url + pool.paths.getWatchlist, {
    params: { language: 'en-US', page: '1' },
    headers: {
        Authorization: pool.accessToken
    }
})

const getMovieDetails = (movieId) => axios.get(pool.base_url + pool.paths.movieDetails + "/" + movieId, {
    params: { language: 'en-US', page: '1' },
    headers: {
        Authorization: pool.accessToken
    }
})

export { getMovieCategories, getTrendingMovies, serachMovies, getAllMovies, getAllWatchlist, getMovieDetails }
