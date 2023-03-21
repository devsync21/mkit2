import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionSpecs, TransitionPresets, CardStyleInterpolators,createStackNavigator  } from '@react-navigation/stack';
// import { TransitionPresets } from '@react-navigation/stack';
import BoardTitleScreen from './BoardTitleScreen';
import BoardDetailScreen from './BoardDetailScreen';
import BoardSearchScreen from './BoardSearchScreen';
import SettingScreen from './SettingScreen';
import SettingThemeScreen from './SettingThemeScreen';
import BoardWriteScreen from './BoardWriteScreen';

const Stack = createStackNavigator();

const screenOptions = {
  // headerShown: false
//   gestureEnabled : false,
//   swipeEnabled: true,

}

const BoardScreen = ({route,navigation}) => {
	// console.log("sss",route.params)

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
			

			 options={{ headerShown: false , gestureEnabled : true}}
			/>  


		<Stack.Screen
			name="BoardWriteScreen"
			initialParams={{ category: route.params.category, titleName : route.params.titleName}}

			component={BoardWriteScreen}      
			options={		
					{
					cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					headerShown: false 
			  }}
			  	

		/>	

		<Stack.Screen name="SettingScreen" component={SettingScreen} 
		
		/>    
    
		<Stack.Screen name="SettingThemeScreen" component={SettingThemeScreen} 
		
		/>    
     
    </Stack.Navigator>

  )
}

export default BoardScreen