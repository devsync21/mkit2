import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoardTitleScreen from './BoardTitleScreen';
import BoardDetailScreen from './BoardDetailScreen';
import BoardSearchScreen from './BoardSearchScreen';
import SettingScreen from './SettingScreen';
import SettingThemeScreen from './SettingThemeScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  // headerShown: false
}

const BoardScreen = ({route,navigation}) => {
	// console.log("sss",navigation)

  return (

  	<Stack.Navigator screenOptions={screenOptions}>

		
		<Stack.Screen
			name="BoardTitleScreen"
			component={BoardTitleScreen}       
			initialParams={{ category: route.params.category, titleName : route.params.titleName}}

			options={{ headerShown: false }}

		/>

		<Stack.Screen
			name="BoardSearchScreen"
			component={BoardSearchScreen}       
		
			options={{ headerShown: false }}

		/>


		<Stack.Screen name="BoardDetailScreen" component={BoardDetailScreen} 
			 options={{ headerShown: false }}
			/>  

		<Stack.Screen name="SettingScreen" component={SettingScreen} 
		
		/>    
    
		<Stack.Screen name="SettingThemeScreen" component={SettingThemeScreen} 
		
		/>    
     
    </Stack.Navigator>

  )
}

export default BoardScreen