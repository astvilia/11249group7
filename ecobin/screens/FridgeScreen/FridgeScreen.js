import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert, ActivityIndicator, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import FridgeItem from '../../components/FridgeItem';
import AddItemButton from '../../components/AddItemButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@apollo/client';
import { client } from '../../apollo';
import styles from './styles';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MY_FRIDGE_QUERY, ADD_ITEM_MUTATION } from '../../apollo';

//Exporting fridgeId for barcode scanner
export let fridgeIdNumber = '';

//FridgeScreen
export default function FridgeScreen({ navigation }) {
  //Keeps track of state for the add item menu
  const [addMenuVisible, setAddMenuVisible] = useState(false);
  //Keeps track of state for the manual add menu
  const [manualAddMenuVisible, setManualAddMenuVisible] = useState(false);
  //Keeps track of state for the fridge's items
  const [item, setItems] = useState([]);
  const [name, setName] = useState('')
  const [expDate, setExpDate] = useState('')
  //Calling the my fridge query
  const { data, error, loading, refetch } = useQuery(MY_FRIDGE_QUERY)
  //Calling the add item mutation
  const [addItem, { data: addItemData, error: addItemError, loading: addItemLoading }] = useMutation(ADD_ITEM_MUTATION)
  
  //Requery my fridge when deleting an item
  const deleteClicked = () => {
    refetch()
  }

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
      fridgeIdNumber = data.myFridge[0].id;
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

  //Adds item with given name and expDate
  const manualAddSubmit = async () => {
    try {
      await addItem({variables: { name: name, expDate: expDate, imageLink: "", fridgeId: data.myFridge[0].id }})
    } catch (error) {
      Alert.alert(error.toString())
    }
  }
  
  //While my fridge is loading a lone loading indicator is portrayed
  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/*Sign out button*/}
      <TouchableOpacity onPress={signOut} style={styles.exitButton}>
        <Ionicons name="exit-outline" size={35} color="white" />
      </TouchableOpacity>

      {/*My Fridge Title*/}
      <Text style={styles.myFridgeTitle}>My Fridge </Text>

      {/*Flat list for the fridge's items*/}
      <FlatList
        data={item}
        renderItem={({item}) => <FridgeItem item={item} deleteFunc={deleteClicked}/>}
        style={styles.flatListStyle}
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
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => {
              setAddMenuVisible(!addMenuVisible)
            }}>
              <AntDesign name="close" size={24} color="white"/>
            </TouchableOpacity>

              {/*Add manually option*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setAddMenuVisible(!addMenuVisible)
                  setManualAddMenuVisible(!manualAddMenuVisible)
                }}
              >
                <Text style={styles.textStyle}>Add Manually</Text>
              </TouchableOpacity>

              {/*Barcode scanner option*/}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setAddMenuVisible(!addMenuVisible)
                  navigation.navigate('Cam')
                }}
              >
                <Text style={styles.textStyle}>Add with Barcode Scanner</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>

      {/*Menu for inputting item data and adding it*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={manualAddMenuVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAddMenuVisible(!addMenuVisible);
          setManualAddMenuVisible(!manualAddMenuVisible);
        }}
      >
        <View style={styles.centeredManualView}>
          <View style={styles.modalManualView}>
            <TouchableOpacity style={{ marginBottom: 'auto', marginLeft: 'auto' }} onPress={() => {
              setName('')
              setExpDate('')
              setManualAddMenuVisible(!manualAddMenuVisible)
            }}>
              <AntDesign name="close" size={24} color="white"/>
            </TouchableOpacity>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder='Item Name'
                placeholderTextColor='#777777'
                onChangeText={(name) => setName(name)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder='Expiration Date'
                placeholderTextColor='#777777'
                onChangeText={(expDate) => setExpDate(expDate)}
              />
            </View>
            {addItemLoading && <ActivityIndicator />}
            <TouchableOpacity style={styles.button} disabled={addItemLoading} onPress={manualAddSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*Labels for fridge elements*/}
      <View style={styles.labelContainer}>
        <Text style={{ flex: 0.3, textAlign: 'center', color: 'white' }}>Image</Text>
        <Text style={{ flex: 0.4, textAlign: 'center', color: 'white' }}>Item Name</Text>
        <Text style={{ flex: 0.3, textAlign: 'center', color: 'red' }}>Exp Date</Text>
      </View>

      {/*Add item button which opens add item menu*/}
      <AddItemButton onAdd={() => setAddMenuVisible(!addMenuVisible)}/>
    </View>
  )
}