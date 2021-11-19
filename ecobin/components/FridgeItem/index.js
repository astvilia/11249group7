import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Alert, TextInput } from 'react-native'
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useMutation, gql } from '@apollo/client';
import { DELETE_ITEM_MUTATION } from '../../apollo';

//Fridge item component which takes the given item as an argument
const FridgeItem = ({ item, deleteFunc }) => {
    
    //Delete item mutation
    const [deleteItem, { data: deleteItemData, error: deleteItemError, loading: deleteItemLoading }] = useMutation(DELETE_ITEM_MUTATION)

    //Deletes item and calls passed function to refresh fridge page
    const deleteThisItem = async () => {
        try {
            await deleteItem({variables: { itemId: item.id }})
        } catch (error) {
            Alert.alert(error.toString())
        }
        deleteFunc()
    }

    //Swiping left and clicking delete to delete an item
    const rightSwipe = () => {
        return(
            <TouchableOpacity onPress={deleteThisItem} style={{ backgroundColor: 'red', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Animated.Text style={{ fontSize: 20, color: 'white' }}>Delete</Animated.Text>
            </TouchableOpacity>
        )
    }

    return (
    //Contains the picture as well as the name and expiration date
        <Swipeable renderRightActions={rightSwipe} renderLeftActions={null}>
            <View style={styles.root}>
                <View style={styles.iconContainer}>
                    {(item.imageLink == '') && <MaterialCommunityIcons name="fridge" size={60} color="grey"/>}
                    {(item.imageLink != '') && <Image style={styles.imageStyle} source={{uri:item.imageLink}} />}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <Text style={styles.name}>{ item.name }</Text>

                    <Text style={styles.expDate}>{ item.expDate }</Text>
                </View>
            </View>
        </Swipeable>
    
    )
}
export default FridgeItem
