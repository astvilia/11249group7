import React from 'react';
import { TouchableOpacity } from 'react-native'
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
 
//Add item button component, takes a function as an argument to determine behavior when pressed
const AddItemButton = ({ onAdd }) => {
  return (
  <TouchableOpacity style={styles.iconContainer} onPress={onAdd}>
    <AntDesign name="pluscircleo" size={55} color="white" />
  </TouchableOpacity>
  )
}
export default AddItemButton