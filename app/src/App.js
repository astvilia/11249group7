import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { BarCodeScanner, BarcodeScanner } from 'expo-barcode-scanner';

export default function App(){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  
  const askCamPeremission = () =>{
    (async()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status, 'granted');
    })
  }
  //Request Camera Permission
  useEffect(()=>{
    askCamPeremission();
  },[]);

  //After scan -- what happens?
  const handleBarcodeScan = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data + '\n');
  }

  //Check Permissions
  if(hasPermission == null){
    return(
      <View style={styles.container}>
        <Text>Requesting for cam permission</Text>
      </View>
    )
  }




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

};
