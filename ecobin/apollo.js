import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gql } from '@apollo/client';

//URI of local host apollo server
const URI = 'http://0.0.0.0:4000'

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

//The API call for deleting an item in a fridge
export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($itemId: ID!) {
      deleteItem(itemId: $itemId)
  }
`

//The API call for querying a user's fridge
export const MY_FRIDGE_QUERY = gql`
  query myFridge {
    myFridge {
      id
      items {
        id
        name
        expDate
        imageLink
      }
      users {
        id
      }
    }
  }
`

//The API call for adding an item to a fridge
export const ADD_ITEM_MUTATION = gql`
  mutation addItem($name: String!, $expDate: String!, $imageLink: String, $fridgeId: ID!) {
    addItem(name: $name, expDate: $expDate, imageLink: $imageLink, fridgeId: $fridgeId) {
      id
      name
      expDate
      imageLink

      fridge {
        id
        items {
          id
          name
          expDate
          imageLink
        }
      }
    }
  }
`

//The API call for creating the fridge when signing up
export const CREATE_FRIDGE_MUTATION = gql`
  mutation createFridge {
    createFridge {
      id
      users {
        id
      }
    }
  }
`

//The API call for signing in
export const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password}) {
      token
      user {
        id
        email
      }
    }
  }
`

//The API call for signing up
export const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!,
  $password:String!) {
    signUp(input: {
      email: $email,
      password: $password,
    }) {
      token
      user {
        id
      }
    }
  }
`