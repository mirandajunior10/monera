import React, {useEffect} from 'react';
import Navigator from './App/navigator';
import { YellowBox, StatusBar } from 'react-native';


export default function App() { 
  YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
  
    useEffect(() => {
  });
StatusBar.setBackgroundColor('#fff', true)
StatusBar.setBarStyle("dark-content")
  return <Navigator/>
}

