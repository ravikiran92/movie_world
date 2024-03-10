import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import CommonLayout from '../Layout/CommonLayout'
import { getTrendingMovies, serachMovies, getAllMovies, getAllWatchlist } from '../Api/movieApi'
import MovieCard from '../Components/MovieCard'
import AllMovieCard from '../Components/AllMovieCard'
import { useDispatch, useSelector } from 'react-redux';
import { setAllMovies } from '../Redux/Slice/MovieSlice';

const Home = () => {


    const dispatch = useDispatch()

    const [trendingMovies, setTrendingMovies] = useState([])

    const watchlist = useSelector((state) => state?.Movie?.watchlist)

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false)
    // const [allMovies, setAllMovies] = useState([]);

    const allMovies = useSelector((state) => state?.Movie?.allMovies)


    useEffect(() => {
        setSearchLoading(true)
        const delaySearch = setTimeout(() => {
            searchMovies();
            setSearchLoading(false)
        }, 500); // Adjust the debounce delay as needed

        return () => clearTimeout(delaySearch);
    }, [query]);

    const searchMovies = async () => {
        try {
            const response = await serachMovies(query)
            setSearchResult(response?.data?.results)
        } catch (error) {
            console.error('Error searching movies:', error.message);
        }
    };

    const handleCategoryPress = (category) => {
        // Implement navigation or other actions when a category is pressed
        console.log(`Category pressed: ${category.name}`);
    };

    const getTrendMovie = async () => {
        try {
            const response = await getTrendingMovies()
            if (response?.data) {
                setTrendingMovies(response?.data?.results)
            }
        } catch (error) {
            // Handle errors
            console.error('Error:', error.message);
        }
    }

    const getAll = async () => {
        try {
            const response = await getAllMovies()
            if (response?.data) {
                dispatch(setAllMovies(response?.data?.results))
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    useEffect(() => {
        getAll()
        getTrendMovie()
    }, [])

    return (
        <MainLayout>
            <CommonLayout>

                <Text style={styles.title}>Search Movies</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={query}
                        onChangeText={(val) => { setQuery(val) }}
                        placeholder="Search"
                        placeholderTextColor="#A7A5A5"
                        underlineColorAndroid="transparent" // Remove default underline on Android
                        theme={{
                            colors: { primary: 'black', underlineColor: 'transparent' },
                        }}
                    />
                </View>

                {/* Trending Movie */}

                <View style={{ marginTop: 20 }}>
                    <MovieCard
                        data={trendingMovies}
                        onPress={handleCategoryPress}
                        title="Trending Near You" />
                </View>

                {/* Watchlist */}

                <View style={{ marginTop: 20 }}>
                    <MovieCard
                        data={watchlist}
                        onPress={handleCategoryPress}
                        title="Watchlist" />
                </View>

                {/* Trending Movie */}

                <View style={{ marginTop: 20 }}>
                    <AllMovieCard
                        data={searchResult !== undefined && searchResult !== null && searchResult?.length > 0 ? searchResult : allMovies}
                        onPress={handleCategoryPress}
                        title="All Movies"
                        faveIcon={true}
                        loader={searchLoading} />
                </View>


            </CommonLayout>
        </MainLayout>
    )
}

export default Home

const styles = StyleSheet.create({
    input: {
        flex: 1,
        fontSize: 16,
        height: 44,
        color: 'black'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1, // Add a border
        borderColor: '#A7A5A5', // Border color
        borderRadius: 5, // Border radius for rounded corners (optional)
    },
    title: {
        color: "#013D62",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
})