import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import IconPlan from 'react-native-vector-icons/Ionicons'
import IconPassword from 'react-native-vector-icons/Ionicons';
import { pool } from '../Utils/pool';
import LottieView from 'lottie-react-native';
import showToastWithGravity from '../Utils/Toastify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [nameError, setNameError] = useState("")
    const [mobileError, setMobileError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setconfirmPasswordError] = useState("")

    const [secureTextEntry, setsecureTextEntry] = useState(true);
    const [secureConfirmTextEntry, setsecureConfirmTextEntry] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        // await AsyncStorage.clear();
        const mobilePattern = new RegExp(/^[0-9\b]+$/);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;;
        if (!name) {

            setNameError("Please enter your username")

        } else if (!mobile) {
            setNameError("")
            setMobileError('Please enter mobile number');

        } else if (mobile.length !== 10) {
            setNameError("")

            setMobileError('Invalid mobile number');

        } else if (!mobilePattern.test(mobile)) {

            setNameError("")
            setMobileError('Invalid mobile number');

        } else if (!email) {
            setNameError("")
            setMobileError("")
            setEmailError('Please enter email id');

        } else if (!emailRegex.test(email)) {
            setNameError("")
            setMobileError("")
            setEmailError('Please enter valid email id');
        } else if (!password) {
            setNameError("")

            setMobileError("")
            setEmailError("")
            setPasswordError('Please enter password');
        } else if (!confirmPassword) {
            setNameError("")

            setMobileError("")
            setEmailError("")
            setPasswordError("")
            setconfirmPasswordError('Please enter confirm password');
        } else if (password !== confirmPassword) {
            setNameError("")

            setMobileError("")
            setEmailError("")
            setPasswordError("")
            setconfirmPasswordError('Password does not match');
        } else {

            setNameError("")
            setMobileError("")
            setEmailError("")
            setPasswordError("")
            setconfirmPasswordError("")

            // await AsyncStorage.clear();

            setLoading(true)

            const payload = {
                name,
                email,
                mobile,
                password,
            }

            try {
                const storedUsers = await AsyncStorage.getItem('users');
                if (storedUsers) {
                    const parseData = JSON.parse(storedUsers)

                    if (parseData.some(user => user.mobile === mobile)) {
                        showToastWithGravity('Mobile is already taken. Please choose another.');
                        return;
                    }
                    await AsyncStorage.setItem('users', JSON.stringify([...parseData, payload]));
                    showToastWithGravity("User registered successfully")
                    navigation.navigate('Login');
                } else {
                    const formData = [payload]
                    await AsyncStorage.setItem('users', JSON.stringify(formData));
                    showToastWithGravity("User registered successfully")
                    navigation.navigate('Login');
                }

            } catch (error) {
                setLoading(false)
                showToast(error.message)
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
                            REGISTER
                        </Text>
                    </View>


                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            {/* <IconUser name={'user'} size={24} color="#D4D4D4" style={styles.icon} /> */}
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={name => setName(name)}
                                placeholder="Enter Username"
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent" // Remove default underline on Android
                                theme={{
                                    colors: { primary: 'black', underlineColor: 'transparent' },
                                }}
                            />
                        </View>
                        {
                            nameError !== "" &&
                            <View style={styles.carderror}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ff0000' }}>
                                    {<Text>{nameError}</Text>}
                                </Text>
                            </View>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            <TextInput
                                style={styles.input}
                                value={mobile}
                                onChangeText={mobile => setMobile(mobile)}
                                placeholder="Enter Mobile No"
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent"
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
                            {/* <MailIcon name={'email'} size={24} color="#D4D4D4" style={styles.icon} /> */}
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={email => setEmail(email)}
                                placeholder="Enter Email Id"
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent" // Remove default underline on Android
                                returnKeyType="next"
                                autoCapitalize="none"
                                theme={{
                                    colors: { primary: 'black', underlineColor: 'transparent' },
                                }}
                            />
                        </View>
                        {
                            emailError !== "" &&
                            <View style={styles.carderror}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ff0000' }}>
                                    {<Text>{emailError}</Text>}
                                </Text>
                            </View>
                        }
                    </View>


                    {/* </View> */}

                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={password => setPassword(password)}
                                placeholder="Enter Password"
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent" // Remove default underline on Android
                                returnKeyType="next"
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

                    <View style={styles.inputContainer}>
                        <View style={styles.inputSubContainer}>

                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                                placeholder="Confirm Password"
                                placeholderTextColor="#A7A5A5"
                                underlineColorAndroid="transparent" // Remove default underline on Android
                                returnKeyType="next"
                                autoCompleteType="password"
                                secureTextEntry={secureConfirmTextEntry}
                                theme={{
                                    colors: { primary: 'black', underlineColor: 'transparent' },
                                }}
                            />
                            <IconPassword name={secureConfirmTextEntry ? 'eye-off-sharp' : 'eye-sharp'} size={24} color="#D4D4D4" style={styles.icon} onPress={() => { setsecureConfirmTextEntry(!secureConfirmTextEntry) }} />
                        </View>
                        {
                            confirmPasswordError !== "" &&
                            <View style={styles.carderror}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ff0000' }}>
                                    {<Text>{confirmPasswordError}</Text>}
                                </Text>
                            </View>
                        }
                    </View>

                    <View
                        style={styles.buttonContainer}
                    >
                        {
                            loading ?
                                <ActivityIndicator size="large" color="#FFFFFF" />
                                :
                                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center' }} onPress={() => { handleRegister() }}>
                                    <IconPlan name={'paper-plane-outline'} size={24} color="#FFFFFF" style={styles.icon} />
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                        }

                    </View>

                    <View style={{ alignSelf: 'center', marginVertical: 26, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, color: "#727272", fontFamily: 'Poppins-Regular' }}>Already have an account ? </Text>

                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                            <Text style={{ fontSize: 20, color: "#013D62", fontWeight: '600', fontFamily: 'Poppins-SemiBold' }}>Login</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </View >
    )
}

export default Register

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
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 5,
        fontSize: 28
    },
    logo: {
        height: 150,
        width: 150,
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
    // input: {
    //   flex: 1,
    //   paddingTop: 10,
    //   paddingRight: 10,
    //   paddingBottom: 10,
    //   paddingLeft: 0,
    //   backgroundColor: '#fff',
    //   color: '#424242',
    // },


    // --------
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
    },
});