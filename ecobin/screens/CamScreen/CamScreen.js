import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useMutation } from '@apollo/client';
import { fridgeIdNumber } from '../FridgeScreen/FridgeScreen';
import { ADD_ITEM_MUTATION } from '../../apollo';

const BARCODE_API_QUERY = 'https://api.barcodelookup.com/v3/products?barcode='
const BARCODE_API_KEY = '&key=xbjsj0xc0x3i668k9pcf5znep7btxx'

export default function Cam({ navigation }) {

  const addItemBarcode = async ( data ) => {
    const url = (BARCODE_API_QUERY.concat(data)).concat(BARCODE_API_KEY);
    try {
      const response = await fetch(url);
      const json = await response.json();
      try {
        await addItem({variables: { name: json.products[0].title, expDate: 'N/A',
          imageLink: json.products[0].images[0], fridgeId: fridgeIdNumber }});
      } catch (error) {
        Alert.alert(error.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [addItem, { data: addItemData, error: addItemError, loading: addItemLoading }] = useMutation(ADD_ITEM_MUTATION)

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    await addItemBarcode(data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ marginBottom: 50 }}>
        <Button title={'GoBack'} onPress={() => navigation.navigate('Fridge')} color='white'/>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {addItemLoading && <ActivityIndicator />}
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='white' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 24,
    margin: 15,
    color: 'white',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    alignSelf: 'center',
  }
});