// Header.js

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileIcon from 'react-native-vector-icons/FontAwesome'
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons'

const Header = ({ username }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.leftContainer} onPress={() => { navigation.navigate('profile') }}>
                {/* <Image
                    source={require('./path/to/user-icon.png')} // Replace with your user icon path
                    style={styles.userIcon}
                /> */}
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: "#013D62" }}><ProfileIcon name={'user-circle'} color="#013D62" size={18} /> {username}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rightContainer} onPress={() => { navigation.navigate('favorite') }}>
                <FavoriteIcon name={'favorite'} color="red" size={26} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff', // Replace with your desired background color
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIcon: {
        width: 30,
        height: 30,
        borderRadius: 15, // Assuming the user icon is circular
        marginRight: 8,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 16,
        color: '#013D62', // Replace with your desired text color
        fontWeight: 'bold',
    },
});

export default Header;
