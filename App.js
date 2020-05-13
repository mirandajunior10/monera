import React, {useEffect} from 'react';
import Navigator from './App/navigator';
import { YellowBox } from 'react-native';


export default function App() { 
  YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
  
    useEffect(() => {
  });

  return <Navigator/>
}

