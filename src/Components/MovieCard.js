import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { pool } from '../Utils/pool';
import ViewMoreIcon from 'react-native-vector-icons/MaterialIcons'
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
// import TrendIcon from 'react-native-vector-icons/FontAwesome6'

const MovieCard = ({ data, onPress, title }) => {

    const navigation = useNavigation()

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={styles.title}>{title}</Text>
                {title === "Watchlist" && <ViewMoreIcon name={'read-more'} size={24} color="#000000" onPress={() => { navigation.navigate('watchlist') }} />}

            </View>

            {
                title === "Watchlist" && data.length === 0 &&

                <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>
                    Your Watchlist is currently empty
                    Add Movies that you want to watch later by clicking Add to Watchlist.
                </Text>

            }

            {
                data.length > 0 &&

                <View style={styles.card}>
                    <FlatList
                        horizontal
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View onPress={() => onPress(item)}>

                                <TouchableOpacity
                                    style={{ marginHorizontal: 12, marginVertical: 6, flex: 1, alignItems: 'center' }}
                                    onPress={() => { navigation.navigate('details', { movieId: item.id }) }}>
                                    <Image
                                        source={{ uri: `${pool.img_url}${item?.poster_path}` }}
                                        style={styles.cardImage} />
                                    <Text style={{ color: 'black', fontSize: 11, fontFamily: 'Poppins-SemiBold', textAlign: 'center' }} numberOfLines={1}>{item.title}</Text>

                                </TouchableOpacity>
                                {/* {
                                faveIcon &&
                                <View style={{ position: 'absolute', top: 2, right: 2 }}>
                                    <FavoriteIcon name={fav ? 'favorite' : 'favorite-border'} color="red" size={18} onPress={() => { setFav(!fav) }} />
                                </View>
                            } */}


                            </View>
                        )}
                    />
                </View >
            }
        </>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    title: {
        color: "#013D62",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    card: {
        marginTop: 4,
        marginHorizontal: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f2f5fa',
        justifyContent: 'center',
        alignItems: 'left',
        elevation: 2,
        width: '100%',
        // minHeight: 100,
    },
    cardImage: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 6,
        alignItems: 'center'
    },
})