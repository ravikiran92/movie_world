import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MainLayout from '../Layout/MainLayout'
import CommonLayout from '../Layout/CommonLayout'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import showToastWithGravity from '../Utils/Toastify'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {

    const navigation = useNavigation()

    const handleLogout = () => {
        AsyncStorage.removeItem('isUserLogin');
        showToastWithGravity('Logout successful...!');
        navigation.navigate('Login');
    }
    return (
        <MainLayout>
            <CommonLayout>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.title}>Profile</Text>
                </View>

                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleLogout() }}>

                    <Text
                        style={{
                            color: '#FFF',
                            marginTop: 25,
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 18,
                            textAlign: 'center',
                            backgroundColor: '#013D62',
                            borderRadius: 6,
                            paddingHorizontal: 12,
                            paddingVertical: 6
                        }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </CommonLayout>
        </MainLayout>
    )
}

export default Profile

const styles = StyleSheet.create({
    title: {
        color: "#013D62",
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
})