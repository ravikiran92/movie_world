export const pool = {
    base_url: 'https://api.themoviedb.org/3',
    img_url: "https://image.tmdb.org/t/p/original",
    paths: {
        movieCategory: '/genre/movie/list',
        allMovies: '/trending/movie/day',
        trendingMovie: '/trending/movie/week',
        serachMovie: '/search/movie',
        getWatchlist: '/account/21068119/watchlist/movies',
        movieDetails: '/movie'
    },
    accessToken: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmVhNzU3YWRkYjNmMzc2NWE2ZDE5ODRjNzFkN2ZiMSIsInN1YiI6IjY1ZTg3NjRmYTZjMTA0MDE2NGU4ZTZiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JIKzbjHx0lhN4p0-KQOQjJyhe8MGYOcx0EHeNkQYCLs'

};
