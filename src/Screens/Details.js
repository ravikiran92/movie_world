import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import CommonLayout from '../Layout/CommonLayout'
import { pool } from '../Utils/pool'
import { getMovieDetails } from '../Api/movieApi'
import LottieView from 'lottie-react-native'
import DateIcon from 'react-native-vector-icons/Fontisto'
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons'
import WatchListIcon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorites, removeFromWatchList, setFavorite, setWatchList } from '../Redux/Slice/MovieSlice'
import showToastWithGravity from '../Utils/Toastify'

const Details = (props) => {

    const dispatch = useDispatch()

    const [Loading, setLoading] = useState(false)
    const [movieDetails, setMovieDetails] = useState(false)

    const favoriteList = useSelector((state) => state?.Movie?.favorite)
    const watchList = useSelector((state) => state?.Movie?.watchlist)

    getDetails = async () => {
        setLoading(true)
        try {
            const response = await getMovieDetails(props?.route?.params?.movieId)
            setLoading(false)
            if (response?.data) {
                setMovieDetails(response?.data)
            }
        } catch (error) {
            setLoading(true)
            console.error('Error:', error.message);
        }
    }


    useEffect(() => {
        getDetails()
    }, [])


    const isFavorite = (item) => favoriteList.some((fav) => fav.id === item.id);

    const handleFavorite = (item) => {
        if (isFavorite(item)) {
            dispatch(removeFromFavorites(item.id))
            showToastWithGravity("Removed from your favorite list")
        } else {
            dispatch(setFavorite(item))
            showToastWithGravity("Added into your favorite list")
        }
    };

    const isWatchList = (item) => watchList.some((watchList) => watchList.id === item.id);

    const handleWatchList = (item) => {
        if (isWatchList(item)) {
            dispatch(removeFromWatchList(item.id))
            showToastWithGravity("Removed from your watchlist")
        } else {
            dispatch(setWatchList(item));
            showToastWithGravity("Added into your watchlist")
        }
    };

    if (movieDetails === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../Assets/Animations/Loading.json')}
                    autoPlay
                    loop
                    style={{ alignSelf: 'center', resizeMode: 'cover', marginTop: 50, height: 150, width: '100%' }}
                />
            </View>
        )
    }

    return (
        <MainLayout>
            {
                Loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                            source={require('../Assets/Animations/Loading.json')}
                            autoPlay
                            loop
                            style={{ alignSelf: 'center', resizeMode: 'cover', marginTop: 50, height: 150, width: '100%' }}
                        />
                    </View>
                    :
                    <CommonLayout>
                        <View style={{ height: 200, position: 'relative' }}>
                            <Image
                                source={{ uri: `${pool.img_url}${movieDetails?.backdrop_path}` }}
                                style={styles.img} />
                            <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'white', borderRadius: 50, padding: 4, marginBottom: 4 }}
                                    onPress={() => { handleFavorite(movieDetails) }}>
                                    <FavoriteIcon name={'favorite'} color="red" size={26} />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 50, padding: 4 }}
                                    onPress={() => { handleWatchList(movieDetails) }} >
                                    <WatchListIcon name={'add-to-list'} color="black" size={24} />
                                </TouchableOpacity>



                            </View>
                        </View>
                        <Text style={styles.movieTitle}>{movieDetails?.original_title}</Text>

                        <Text style={styles.movieRelease}>{movieDetails?.overview}</Text>

                        <Text style={styles.movieRelease}><DateIcon name={'date'} color="#000" /> {movieDetails?.release_date}</Text>
                        <Text>

                        </Text>

                    </CommonLayout>
            }
        </MainLayout>
    )
}

export default Details

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: 200,
        resizeMode: 'stretch',
        borderRadius: 6
    },
    movieTitle: {
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        marginTop: 2
    },
    movieRelease: {
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
    }
})