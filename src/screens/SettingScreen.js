import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity,Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SettingLogin = () => {


	return (
		<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:"center",
		paddingHorizontal:10, paddingVertical:10,
		backgroundColor:"darkgrey",
		borderWidth:1, borderColor:'grey'}}>
			<Text>login</Text>
		</View>
	)
}

// 메인 함수
const SettingScreen = () => {
	const [isEnabled, setIsEnabled] = useState(false)
	const [isEnabled2, setIsEnabled2] = useState(false)


	const setContent = [
		{id:1, text: '1번 꺼', val: isEnabled, setVal: setIsEnabled},
		{id:2, text: '2번 꺼', val: isEnabled2, setVal: setIsEnabled2}

	]

	

	const SettingLine = (item) => {
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
				borderWidth:1, borderColor:'grey'
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
			<SettingLine item = {setContent[0]}/>
			<SettingLine item = {setContent[1]}/>

       </View>
    </>

  )
}

export default SettingScreen