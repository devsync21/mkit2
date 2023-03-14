import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity,Switch,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../store/AuthContext';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 


import { SettingTheme } from '../api/SettingTheme';


import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';





// 메인 함수
const SettingScreen = ({navigation}) => {
	const [isEnabled, setIsEnabled] = useState(false)
	const [isEnabled2, setIsEnabled2] = useState(false)
	//아래꺼는 지우고 reducer 로 대치되지 않을까.
	
	

	const {authValue, setAuthValue} = useContext(AuthContext)
	const {themeValue, tdispatch} = useContext(ThemeContext)
	const {configValue, fdispatch} = useContext(ConfigContext)

	const [ffontSize, setFfontSize] = useState(configValue.CfontSize)



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
		// console.log("haha",navigation)
		navigation.navigate('SettingThemeScreen')
		
	}
	const SettingrResult = () => {
		return (
			<View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:"center",
			paddingHorizontal:10, paddingVertical:10,	height:130,
			backgroundColor:themeValue.Content.CbackgroundColor,
			borderWidth:1, borderColor:'grey'}}>
				<Text style ={{
					color: themeValue.Content.CfontColor,
					fontSize : configValue.CfontSize,
					lineHeight : configValue.ClineHeight
				}}> 
				젊은 날엔 젊음을 모르고 사랑할 땐 사랑이 보이지 않았네. 하지만 이제 뒤돌아보니 우린 젊고 서로 사랑을 했구나. </Text>
			</View>
		)
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
	const onChangeSize = () => {}
	const SettingFontSize = () => {
		// console.log("dd",ffontSize)

		return(
			<View>
			<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:"center",
			paddingHorizontal:10, paddingVertical:10,
			backgroundColor:"darkgrey",
			borderWidth:1, borderColor:'grey',
			height:80
			}}>
				<Text>글꼴 크기 조정</Text>
				<Button title='-' onPress={()=> setFfontSize(prevState =>prevState-1)}></Button>
					<TextInput
						// editable = {false}
						onChangeText={onChangeSize}
						value={ffontSize.toString()}
						style={{height: 40,
								margin: 12,
								borderWidth: 1,
								padding: 10,}}
					/>

				<Button title='+' onPress={()=> setFfontSize(prevState =>prevState+1)}></Button>



			</View>
			
			</View>
		)
	}
	
	useEffect(()=>{
		fdispatch({type: 'CHANGE_FONT', value: ffontSize})

	},[ffontSize])

 	 return (

    <>
       <View style = {{flex:1,backgroundColor:'black',paddingTop:20}}>

			<SettingrResult/>
			<SettingLogin/>
			<SettingLine item = {menuItem[0]} />
			<SettingFontSize/> 
			<SettingSwitchLine item = {setContent[0]}/>
			<SettingSwitchLine item = {setContent[1]}/>

       </View>
    </>

  )
}

export default SettingScreen