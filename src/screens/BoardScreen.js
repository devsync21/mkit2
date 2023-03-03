import React from 'react'
import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoardTitleScreen from './BoardTitleScreen';
import BoardDetailScreen from './BoardDetailScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false
}

const BoardScreen = ({route}) => {

    // console.log(route)
  return (

  <Stack.Navigator screenOptions={screenOptions}>

    
      <Stack.Screen
        name="BoardTitleScreen"
        component={BoardTitleScreen}       
        initialParams={{ category: route.params.category, titleName : route.params.titleName}}

      />


      <Stack.Screen name="DetailScreen" component={BoardDetailScreen} 
      
        />  
     
    </Stack.Navigator>

  )
}

export default BoardScreen