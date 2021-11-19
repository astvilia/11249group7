import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useMutation, gql } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import { CREATE_FRIDGE_MUTATION, SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '../../apollo';

//Login Screen
export default function LoginScreen({ navigation }) {
  //Keeps track of the state for the email and password text inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Calling the sign in mutation which returns a function to call it as wells as the returned data
  const [signIn, { data: signInData, error: signInError, loading: signInLoading }] = useMutation(SIGN_IN_MUTATION)

  //Calling the sign up mutation
  const [signUp, { data: signUpData, error: signUpError, loading: signUpLoading }] = useMutation(SIGN_UP_MUTATION)

  //Calling the create fridge mutation
  const [createFridge, { data: createFridgeData, error: createFridgeError, loading: createFridgeLoading }] = useMutation(CREATE_FRIDGE_MUTATION)

  //Called when the login button is pressed
  const login = async () => {
    try {
      //Attempts to sign in with given email and password
      await signIn({variables: { email, password }})
    } catch (error) {
      Alert.alert(error.toString())
    }
  }

  //Called when the sign up button is pressed
  const signUpButton = async () => {
    try {
      //Attempts to sign up with given email and password
      await signUp({variables: { email, password }})
    } catch (error) {
    Alert.alert(error.toString())
    }
  }

  //When the signUpData variable changes this is called
  useEffect( async () => {
    //If there is data returned from calling signUp the returned token is saved to the device's storage
    if (signUpData)
    {
      await AsyncStorage.setItem('token', signUpData.signUp.token)
      try {
        await createFridge()
      } catch (error) {
        Alert.alert(error.toString())
      }
      navigation.navigate('Fridge')
    }
  }, [signUpData])

  //When the signInData variable changes this is called
  useEffect(() => {
    //If there is data returned from calling signIn the returned token is saved to the device's storage
    if (signInData)
    {
      AsyncStorage.setItem('token', signInData.signIn.token).then(() => {
        navigation.navigate('Fridge')
      })
    }
  }, [signInData])


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Text style={styles.title}>EcoBin</Text>

      {/*The logo*/}
      <Image style={styles.image} source={require('../../assets/EcoBin-BlackBack.png')} />
      
      {/*Input for the email*/}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Username'
          placeholderTextColor='#777777'
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      {/*Input for the password*/}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Password'
          placeholderTextColor='#777777'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {/*Forgot password button*/}
      {/*
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      */}

      {/*Container for login and sign up buttons*/}
      <View style={styles.buttonContainer}>
        {/*Login button*/}
        <TouchableOpacity disabled={signInLoading} onPress={login} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        {/*Loading indicators for when sign in or sign up is loading*/}
        {signInLoading && <ActivityIndicator />}

        {signUpLoading && <ActivityIndicator />}

        {/*Sign up button*/}
        <TouchableOpacity disabled={signUpLoading} onPress={signUpButton} style={styles.loginBtn}>
            <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}