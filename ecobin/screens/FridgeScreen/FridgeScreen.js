import React, { useEffect, useState } from 'react';
import { FlatList, View, Button, Alert, ActivityIndicator, Modal, Text, TouchableOpacity } from 'react-native';
import FridgeItem from '../../components/FridgeItem';
import AddItemButton from '../../components/AddItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, gql } from '@apollo/client';
import { client } from '../../apollo';
import styles from './styles';

//API call for getting the user's fridge
const MY_FRIDGE_QUERY = gql`
  query myFridge {
    myFridge {
      id
      items {
        id
        name
        expDate
      }
      users {
        id
      }
    }
  }
`
 
//FridgeScreen
export default function FridgeScreen({ navigation }) {
  //Keeps tracks of state for the add item menu
  const [addMenuVisible, setAddMenuVisible] = useState(false);
  //Keeps track of state for the fridge's items
  const [item, setItems] = useState([]);

  //Calling the my fridge query
  const { data, error, loading } = useQuery(MY_FRIDGE_QUERY)

  //When there is an error it is alerted
  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching projects', error.message)
    }
  }, [error])

  //When the data returned from the my fridge query, items is set to its contents
  useEffect(() => {
    if (data) {
      setItems(data.myFridge[0].items)
    }
  }, [data])

  //Called when sign out button is pressed
  const signOut = async () => {
    //Removes the token from storage
    await AsyncStorage.removeItem('token')
    //Resets the user's permissions
    client.clearStore()
    //Navigates back to the login page
    navigation.navigate('Login')
  }
  
  //While my fridge is loading a lone loading indicator is portrayed
  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={[styles.container, addMenuVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
      {/*Flat list for the fridge's items*/}
      <FlatList
        data={item}
        renderItem={({item}) => <FridgeItem item={item} />}
        style={{ width: '100%', marginTop: 25 }}
      />
      
      {/*Add item menu*/}
      <Modal
          animationType="slide"
          transparent={true}
          visible={addMenuVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setAddMenuVisible(!addMenuVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.addMenuView}>
              {/*Add manually option*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => setAddMenuVisible(!addMenuVisible)}
              >
                <Text style={styles.textStyle}>Add Manually</Text>
              </TouchableOpacity>

              {/*Barcode scanner option*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => setAddMenuVisible(!addMenuVisible)}
              >
                <Text style={styles.textStyle}>Add with Barcode Scanner</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>

      {/*Sign out button*/}
      <Button title="Go back" onPress={signOut} />

      {/*Add item button which opens add item menu*/}
      <AddItemButton onAdd={() => setAddMenuVisible(!addMenuVisible)}/>
    </View>
  )
}