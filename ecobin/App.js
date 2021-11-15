import * as React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FridgeScreen from './screens/FridgeScreen';
import LoginScreen from './screens/LoginScreen';
import CamScreen from './screens/CamScreen';
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator()

export default function App(){
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Fridge" component={FridgeScreen} />
          <Stack.Screen name="Scanner" component={CamScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('ecoBin', () => App)