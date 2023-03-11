import *  as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from '../components/CustomDrawer';
// import { StyleSheet, Text, View, Button, FlatList,SafeAreaView } from 'react-native';
// import BoardTitleScreen from './src/screens/BoardTitleScreen';
import BoardScreen from './BoardScreen';
import SectionInfo from '../components/SectionInfo';
// import { useWindowDimensions } from 'react-native';
// import {Dimensions }  from 'react-native'

import {AuthContext} from '../store/AuthContext';
import {ThemeContext} from '../store/ThemeContext';
import {ConfigContext} from '../store/ConfigContext';




import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

import InitData from '../components/InitData';

import {SettingTheme, SettingConfig} from '../api/SettingTheme';



const screenOptions = {
  headerShown: false,
  drawerStyle: {
    backgroundColor: '#ededed',    
  },  
 
//   drawerType:'slide'
  

}

const Drawer = createDrawerNavigator();





const MainScreen = () => {
	
    const insets = useSafeAreaInsets();

	const initialAuthState = {
		userid : "",
		passwd : "",
		cookie : ""
	}
	
	const initialThemeState =  SettingTheme(1)   


    const [authValue, setAuthValue] = useState (initialAuthState)
    const [themeValue, setThemeValue] = useState (initialThemeState)
    const [configValue, setConfigValue] = useState (SettingConfig)



	const initializeData = async () => {
		const initData = await InitData()
		// console.log("해답은 ",initData)
		setAuthValue(initData.authValue)
		setThemeValue(initData.themeValue)
		setConfigValue(initData.configValue)

	}

	useEffect(() => {

		initializeData()
		
	 	},[]);




    return (
        <AuthContext.Provider value={{authValue, setAuthValue}}>
			<ThemeContext.Provider value={{themeValue, setThemeValue}}>
				<ConfigContext.Provider value={{configValue, setConfigValue}}>
					<NavigationContainer>
						{/* <View
						style={{
			
							paddingTop: insets.top,
							backgroundColor:'red',
				
						}}
						
						></View> */}

						<Drawer.Navigator 
						drawerContent={props => 
						<CustomDrawer {...props}
							
						/>} 
						initialRouteName="생활 Q&A"
						
						screenOptions={screenOptions} 
						
						
						>
						
							{ SectionInfo.map((item,id) => {
								return (
									<Drawer.Screen 
										initialParams={{ category: item.id, titleName : item.sectionname}} 
										name = {item.sectionname} 
										key={id} 
										// options={({ route }) => ({ title: route.params.name })}  // title 정보 얻으려고
										component={BoardScreen} />
								)
							

							})}

						</Drawer.Navigator>
						<View
						style={{
			
							paddingTop: insets.bottom,
							backgroundColor:'red'

						}}
						
						></View>
					
						
					</NavigationContainer>
				</ConfigContext.Provider>
			</ThemeContext.Provider>
        </AuthContext.Provider>
       
    );
}


export default MainScreen