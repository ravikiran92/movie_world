// components/HorizontalCard.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons'

const MovieCategories = ({ data, onPress, title }) => {

    return (

        <>
            {/* <Text style={styles.title}>Movie Category</Text> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity>
                    <FavoriteIcon name={'favorite'} size={24} color="red" />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item)}>
                        <View style={styles.card}>
                            <Text style={{ color: 'black', fontSize: 11, fontFamily: 'Poppins-SemiBold' }}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "#013D62",
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    card: {
        margin: 4,
        padding: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
});

export default MovieCategories;
