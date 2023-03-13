import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity,Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../store/AuthContext';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 


import { SettingTheme } from '../api/SettingTheme';


import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';





// 메인 함수
const SettingScreen = () => {
	const [isEnabled, setIsEnabled] = useState(false)
	const [isEnabled2, setIsEnabled2] = useState(false)

	const {authValue, setAuthValue} = useContext(AuthContext)
	const {themeValue, tdispatch} = useContext(ThemeContext)
	const {configValue, setConfigValue} = useContext(ConfigContext)



	const setContent = [
		{id:1, text: '1번 꺼', val: isEnabled, setVal: setIsEnabled},
		{id:2, text: '2번 꺼', val: isEnabled2, setVal: setIsEnabled2}

	]
	const menuItem = [
		{id:1, text: '테마 설정'},
		{id:2, text: '테마 설정2222'},


	]
	

	const onPressButton = () => {

		tdispatch({type: 'CHANGE_THEME', value :SettingTheme(8) })
	}

	const pressMenuMore =(value) =>{
		console.log("haha",value)
	}

	const SettingLogin = () => {


		return (
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:"center",
			paddingHorizontal:10, paddingVertical:10,
			backgroundColor:"darkgrey",
			borderWidth:1, borderColor:'grey'}}>
				{ 	authValue.userid.length == 0 ? 
				
					<Text>로그인해주세요 </Text> :

					<Text>logged in as {authValue.userid}</Text>

				}
				
			
			</View>
		)
	}
	

	const SettingLine = (item) =>{

		const menuid = item.item.id

		
	
		return (
			<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:"center",
				paddingHorizontal:10, paddingVertical:10,
				backgroundColor:"darkgrey",
				borderWidth:1, borderColor:'grey',
				height:80
				}} >

				<Text style = {{fontSize:18,color:"white"}}> {item.item.text} </Text>

				<TouchableOpacity onPress={() => pressMenuMore(menuid)} value={item.item}>
					<MaterialIcons name="arrow-forward-ios" size={24} color="black" />
				</TouchableOpacity>
				


			</View>
		)
	}

	const SettingSwitchLine = (item) => {
		const setItem = item.item
		const toggleSwitch = () => {
			// console.log('toggle',item)
			// setIsEnabled(previousState => !previousState);
			setItem.setVal(previousState => !previousState)
		}

		return (
			<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:"center",
				paddingHorizontal:10, paddingVertical:10,
				backgroundColor:"darkgrey",
				borderWidth:1, borderColor:'grey',
				height:80
				}} >
				<Text style = {{fontSize:18,color:"white"}}>{setItem.text}</Text>
				<Switch
					// trackColor={{false: '#767577', true: '#81b0ff'}}
					// thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
					// ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={setItem.val}
				/>
			</View>
		)
	}

 	 return (

    <>
       <View style = {{flex:1,backgroundColor:'black',paddingTop:20}}>

			<SettingLogin/>
			<SettingLine item = {menuItem[0]} />
			<SettingSwitchLine item = {setContent[0]}/>
			<SettingSwitchLine item = {setContent[1]}/>

       </View>
    </>

  )
}

export default SettingScreen