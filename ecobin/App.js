import * as React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FridgeScreen from './screens/FridgeScreen/FridgeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator()

export default function App(){
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/*These are the screens to navigate to and from*/}
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerBackVisible: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerBackVisible: false}}/>
          <Stack.Screen name="Fridge" component={FridgeScreen} options={{ headerBackVisible: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('ecoBin', () => App)