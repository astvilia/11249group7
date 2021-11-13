import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const login = () => {
       navigation.navigate('Fridge')
   }

   const signUp = () => {
       navigation.navigate('Fridge')
   }

   return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <Image style={styles.image} source={require('../assets/favicon.png')} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Email'
          placeholderTextColor='#777777'
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Password'
          placeholderTextColor='#777777'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={login} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signUp} style={styles.loginBtn}>
            <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
      flexDirection: 'row'
  },

  image: {
    flex: 0.25,
    resizeMode: 'contain',
    marginBottom: 80,
  },

  inputView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  TextInput: {
    color: 'black',
    height: 50,
    flex: 0.8,
    padding: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#0645AD'
  },

  loginBtn: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: '#228B22',
  },

  loginText: {
      color: 'white',
  },
});