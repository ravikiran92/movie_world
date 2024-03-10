import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [isLogin, setIsLogin] = useState("")

    const checkUserLogin = async () => {
        let isCheck = await AsyncStorage.getItem('isUserLogin');
        console.log("isCheck", isCheck)
        setIsLogin(isCheck)
    }

    useEffect(() => {
        checkUserLogin()

        setTimeout(() => {
            if (isLogin == `"yes"`) {
                navigation.navigate('Home')
            } else {
                navigation.navigate('Login')
            }
        }, 2000);

    }, []);

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                    source={require('../Assets/Animations/Animation.json')}
                    autoPlay
                    loop
                    style={{ alignSelf: 'center', resizeMode: 'cover', height: 250, width: '100%' }}
                />
                <Text style={{ color: '#000', marginTop: 25, fontFamily: 'Poppins-SemiBold', fontSize: 18, textAlign: 'center' }}>
                    Welcome To Movie World
                </Text>
            </View>
        </>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red',
        marginBottom: 25,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red',
        marginTop: 25,
    },
    logo: {
        width: 250,
        height: 250,
    },
});