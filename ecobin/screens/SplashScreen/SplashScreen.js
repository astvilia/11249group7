import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Splash Screen, first screen when app is started
export default function SplashScreen({ navigation }) {
    //When started it checks to see if user is already authenticate, if so navigates to fridge screen, if not login screen
    useEffect(() => {
        const checkUser = async () => {
            if (await isAuthenticated()) {
                navigation.navigate('Fridge')
            }
            else {
                navigation.navigate('Login')
            }
        }

        checkUser()
    }, [])

    //Checks to see if token is in device storage
    const isAuthenticated = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator />
        </View>
    )
}