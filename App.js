import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Orientation  from 'react-native-orientation';
import Navigator from './App/navigator';


export default function App() {
  
  useEffect(() => {
   // Orientation.lockToPortrait();
  });

  return <Navigator/>
}

