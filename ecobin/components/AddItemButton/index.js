import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
 
const AddItemButton = () => {
   const onPress = () => {
      
   }
  return (
           <View style={styles.iconContainer}>
               <AntDesign name="pluscircleo" size={60} color="black" />
           </View>
  )
}
export default AddItemButton