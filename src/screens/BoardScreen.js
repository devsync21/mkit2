import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoardTitleScreen from './BoardTitleScreen';
import BoardDetailScreen from './BoardDetailScreen';
import SettingScreen from './SettingScreen';
import SettingThemeScreen from './SettingThemeScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  // headerShown: false
}

const BoardScreen = ({route}) => {

    // console.log(route)
    // console.log(route.params.titleName)

    // const routeName = navigation.getState().routes[0].name
    // console.log('changed drawer 000', navigation)

    // useEffect(()=> {
    // 	console.log('changed drawer 000', navigation.getState().routes[0].name)
    // }, [routeName])

  return (

  	<Stack.Navigator screenOptions={screenOptions}>

		
		<Stack.Screen
			name="BoardTitleScreen"
			component={BoardTitleScreen}       
			initialParams={{ category: route.params.category, titleName : route.params.titleName}}

		/>


		<Stack.Screen name="DetailScreen" component={BoardDetailScreen} 
		
			/>  

		<Stack.Screen name="SettingScreen" component={SettingScreen} 
		
		/>    
    
		<Stack.Screen name="SettingThemeScreen" component={SettingThemeScreen} 
		
		/>    
     
    </Stack.Navigator>

  )
}

export default BoardScreen