import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
 
const FridgeItem = ({ item }) => {
   const onPress = () => {
      
   }
  return (
       <Pressable onPress={onPress} style={styles.root}>
           <View style={styles.iconContainer}>
               <MaterialCommunityIcons name="fridge" size={24} color="grey"/>
           </View>
           <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
               <Text style={styles.name}>{ item.name }</Text>
               <Text style={styles.expDate}>{ item.expDate }</Text>
           </View>
       </Pressable>
  )
}
export default FridgeItem
