import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconPassword from 'react-native-vector-icons/Ionicons';
import IconPlan from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { pool } from '../Utils/pool';
import LottieView from 'lottie-react-native';
import showToastWithGravity from '../Utils/Toastify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../Redux/Slice/AuthSlice';


const Login = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const language = "en"

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const [mobileError, setMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [secureTextEntry, setsecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        const mobilePattern = new RegExp(/^[0-9\b]+$/);

        if (!mobile) {
            setMobileError('Please Enter Mobile Number');
        } else if (mobile.length !== 10) {
            setMobileError('Invalid Mobile Number');
        } else if (!mobilePattern.test(mobile)) {
            setMobileError('Invalid Mobile Number');
        } else if (!password) {
            setMobileError('');
            setPasswordError('Please Enter Password');
        } else {

            setLoading(true)
            setMobileError('');
            setPasswordError('');

            try {
                // Fetch user data from AsyncStorage
                const storedUsers = await AsyncStorage.getItem('users');
                if (storedUsers) {
                    const users = JSON.parse(storedUsers);
                    // Check if entered credentials match any stored user data
                    const matchedUser = users.find(user => user.mobile === mobile && user.password === password);
                    setLoading(false)
                    if (matchedUser) {
                        // Successfully logged in
                        AsyncStorage.setItem('isUserLogin', JSON.stringify("yes"));
                        dispatch(login(matchedUser))
                        showToastWithGravity('Login successful...!');
                        navigation.navigate('Home');

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });

                    } else {
                        // Invalid credentials
                        showToastWithGravity('Invalid credentials');
                    }
                } else {
                    // No user data found
                    setLoading(false)
                    showToastWithGravity('No users registered. Please register.');
                }
            } catch (error) {
                setLoading(false)
                console.error('Error during login:', error);
            }
        }


    }

    return (
        <View style={styles.main}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>

                <View style={styles.container}>

                    <View style={{ marginBottom: 14 }}>
                        <LottieView
                            source={require('../Assets/Animations/Animation.json')}
                            autoPlay
                            loop
                            style={{ alignSelf: 'center', resizeMode: 'cover', height: 120, width: '100%', marginTop: 50 }}
                        />
                        <Text style={styles.title}>
                            LOGIN
                        </Text>
                    </View>



                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            {/* <IconUser name={'user'} size={24} color="#D4D4D4" style={styles.icon} /> */}
                            <TextInput
                                style={styles.input}
                                value={mobile}
                                onChangeText={mobile => setMobile(mobile)}
                                placeholder="Enter Mobile No "
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent" // Remove default underline on Android
                                keyboardType={'number-pad'}
                                maxLength={10}
                                theme={{
                                    colors: { primary: 'black', underlineColor: 'transparent' },
                                }}
                            />
                        </View>
                        {
                            mobileError !== "" &&
                            <View style={styles.carderror}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ff0000' }}>
                                    {<Text>{mobileError}</Text>}
                                </Text>
                            </View>
                        }
                    </View>


                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={password => setPassword(password)}
                                placeholder="Enter Password"
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent" // Remove default underline on Android
                                autoCompleteType="password"
                                secureTextEntry={secureTextEntry}
                                theme={{
                                    colors: { primary: 'black', underlineColor: 'transparent' },
                                }}
                            />
                            <IconPassword name={secureTextEntry ? 'eye-off-sharp' : 'eye-sharp'} size={24} color="#D4D4D4" style={styles.icon} onPress={() => { setsecureTextEntry(!secureTextEntry) }} />

                        </View>

                        {
                            passwordError !== "" &&
                            <View style={styles.carderror}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ff0000' }}>
                                    {<Text>{passwordError}</Text>}
                                </Text>
                            </View>
                        }

                    </View>

                    <View>


                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => { handleLogin() }}
                        >
                            {
                                loading ?
                                    <ActivityIndicator size="large" color="#FFFFFF" />
                                    :
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <IconPlan name={'paper-plane-outline'} size={24} color="#FFFFFF" style={styles.icon} />
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </View>
                            }

                        </TouchableOpacity>

                    </View>

                    <View style={{ textAlign: 'center', marginVertical: 26, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: "#727272", fontFamily: 'Poppins-Regular' }}>Don't have an account ? </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                            <Text style={{ fontSize: 20, color: "#013D62", fontWeight: '600', fontFamily: 'Poppins-SemiBold' }}>Register</Text>
                        </TouchableOpacity>

                    </View>



                </View>



            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        flex: 1,

    },
    container: {
        padding: 18,
    },

    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#013D62',
        marginBottom: 5,
        fontSize: 28,
        fontFamily: 'Poppins-SemiBold',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    apkName: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: 'black',
        alignSelf: 'center',
        marginBottom: 12
    },
    cardOne: {
        height: 'auto',
        marginTop: 5,
        elevation: 0,
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    carderror: {
        marginTop: 6,
        marginLeft: 4
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    languageMarathi: {
        backgroundColor: '#004686',
        color: '#fff',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 5,
        width: 80,
        textAlign: 'center',
        fontSize: 18,
    },
    languageEnglish: {
        backgroundColor: 'white',
        color: '#000',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 5,
        borderColor: '#004686',
        borderWidth: 2,
        width: 80,
        textAlign: 'center',
        fontSize: 18,
    },
    activeLangMr: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    activeLangEn: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },

    buttonLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
    },


    // ---------
    inputContainer: {
        marginBottom: 24
    },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1, // Add a border
        borderColor: '#A7A5A5', // Border color
        borderRadius: 5, // Border radius for rounded corners (optional)
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 55,
        color: 'black'
    },
    buttonContainer: {
        width: '50%',
        backgroundColor: '#013D62', // Add background color
        borderRadius: 5, // Add border radius for rounded corners (optional)
        paddingTop: 8,
        paddingBottom: 6,
        alignSelf: 'center',
        marginTop: 12,
    },
    buttonText: {
        fontSize: 18,
        color: 'white', // Add text color,
        fontFamily: "Poppins-SemiBold"
    }

});