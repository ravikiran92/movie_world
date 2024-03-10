import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { pool } from '../Utils/pool';

import { useNavigation } from '@react-navigation/native';
// import TrendIcon from 'react-native-vector-icons/FontAwesome6'

const AllMovieCard = ({ data, onPress, title, faveIcon, loader }) => {
    const navigation = useNavigation()

    const calculateCardWidth = (totalCards) => {
        const maxWidthPercentage = 100;
        const minCardWidthPercentage = 30;
        const maxCardsPerRow = 3;

        const calculatedWidth =
            totalCards <= maxCardsPerRow
                ? `${maxWidthPercentage / totalCards}%`
                : `${minCardWidthPercentage}%`;

        return calculatedWidth;
    };

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={styles.title}>{title}</Text>
                {/* <ViewMoreIcon name={'read-more'} size={24} color="#000000" /> */}
            </View>


            {
                loader ?
                    <View>
                        <ActivityIndicator color="#013D62" />
                    </View>
                    :

                    <ScrollView contentContainerStyle={styles.container}>
                        {
                            data !== undefined &&
                            data !== null &&
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <View key={item.id} style={[
                                        styles.cardContainer,
                                        { width: calculateCardWidth(item.length) },
                                    ]}>
                                        {/* Your card content */}
                                        <TouchableOpacity onPress={() => { navigation.navigate('details', { movieId: item.id }) }} key={index}>
                                            <View style={styles.card}>
                                                <Image
                                                    source={{ uri: `${pool.img_url}${item?.poster_path}` }}
                                                    style={styles.cardImage} />
                                                {/* <Text style={{ color: 'black', fontSize: 11, fontFamily: 'Poppins-SemiBold', alignItems: 'baseline' }} numberOfLines={1}>{item.original_title}</Text> */}


                                            </View>

                                        </TouchableOpacity>
                                    </View>

                                )
                            })
                        }
                    </ScrollView>
            }
        </>
    )
}

export default AllMovieCard

const styles = StyleSheet.create({
    title: {
        color: "#013D62",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },

    releaseData: {
        color: 'darkgrey',
        marginTop: 4,
        alignSelf: 'flex-end',
        fontSize: 8,
        fontFamily: 'Poppins-SemiBold',
    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: 'stretch',
        borderRadius: 6
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    cardContainer: {
        marginBottom: 16,
        backgroundColor: '#fff', // Card background color
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'left',
    },
})