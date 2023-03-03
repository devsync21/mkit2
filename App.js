import * as React from 'react';
import { SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
import { Button, View, Text, Image } from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import MainScreen from './src/screens/MainScreen';

import axios from 'axios'
const baseUrl = 'http://localhost:8000';




export default function App() {
  // const insets = useSafeAreaInsets();


  return (

     

    <SafeAreaProvider style={{ backgroundColor: '#fff', flex: 1 }}>
          <MainScreen/>
    
    </SafeAreaProvider>      
    
    
  );
}