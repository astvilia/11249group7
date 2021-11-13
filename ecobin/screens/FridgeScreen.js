import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';
import FridgeItem from '../components/FridgeItem';
import AddItemButton from '../components/AddItemButton';
 
export default function FridgeScreen({ navigation }) {
 const [item, setItems] = useState([{
   id: '1',
   name: 'Eggs',
   expDate: '12/29/21',
 },
 {
   id: '2',
   name: 'Chicken',
   expDate: '11/27/21',
 },
 {
   id: '3',
   name: 'Cheese',
   expDate: '11/30/21',
 },
 ]);
 
 return (
   <View style={styles.container}>
     <FlatList
       data={item}
       renderItem={({item}) => <FridgeItem item={item} />}
       style={{ width: '100%', marginTop: 25 }}
     />
     <Button title="Go back" onPress={() => navigation.goBack()} />
     <AddItemButton />
   </View>
 );
}
 
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});
