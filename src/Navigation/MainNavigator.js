import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Screens/Login';
import SplashScreen from '../Screens/SplashScreen';
import Home from '../Screens/Home';
import Header from '../Components/Header';
import Watchlist from '../Screens/Watchlist';
import Favorite from '../Screens/Favorite';
import Details from '../Screens/Details';
import Register from '../Screens/Register';
import { useSelector } from 'react-redux';
import Profile from '../Screens/Profile';

const MainNavigator = () => {

    const Stack = createNativeStackNavigator();

    const userData = useSelector((state) => state?.User?.user)


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: 'white', //Set Drawer background
                        width: 150, //Set Drawer width
                    },
                    headerStyle: {
                        backgroundColor: '#004686', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
                <Stack.Screen
                    name="Home"
                    // options={{ headerShown: false }} 
                    options={{
                        header: ({ route, navigation }) => (
                            <Header username={userData?.name} /> // Pass the username dynamically or from state/props
                        ),
                        headerLeft: () => null,
                    }}
                    component={Home} />
                <Stack.Screen
                    name="details"
                    // options={{ headerShown: false }} 
                    options={{
                        header: ({ route, navigation }) => (
                            <Header username={userData?.name} /> // Pass the username dynamically or from state/props
                        ),
                        headerLeft: () => null,
                    }}
                    component={Details} />
                <Stack.Screen
                    name="watchlist"
                    // options={{ headerShown: false }} 
                    options={{
                        header: ({ route, navigation }) => (
                            <Header username={userData?.name} /> // Pass the username dynamically or from state/props
                        ),
                        headerLeft: () => null,
                    }}
                    component={Watchlist} />
                <Stack.Screen
                    name="favorite"
                    // options={{ headerShown: false }} 
                    options={{
                        header: ({ route, navigation }) => (
                            <Header username={userData?.name} /> // Pass the username dynamically or from state/props
                        ),
                        headerLeft: () => null,
                    }}
                    component={Favorite} />
                <Stack.Screen
                    name="profile"
                    // options={{ headerShown: false }} 
                    options={{
                        header: ({ route, navigation }) => (
                            <Header username={userData?.name} /> // Pass the username dynamically or from state/props
                        ),
                        headerLeft: () => null,
                    }}
                    component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})