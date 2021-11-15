import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";

//URI of local host apollo server
const URI = 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: URI,
});

//Passing the token to the header to authorize the user when signing in/up
const authLink = setContext(async (_,{ headers }) => {
  const token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token || '',
    }
  }
})

//Declaring and exporting the client
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});