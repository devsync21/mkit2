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


import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import CheckAuth from '../components/CheckAuth';



const screenOptions = {
  headerShown: false,
  drawerStyle: {
    backgroundColor: '#ededed',    
  },  
 
//   drawerType:'slide'
  

}

const Drawer = createDrawerNavigator();





const MainScreen =  () => {
    const insets = useSafeAreaInsets();

	// const checkauth =  CheckAuth()
	
	const authfirst = async () => {
		 
		 const h = await CheckAuth()
		 console.log("????",h)
	}

	useEffect(() => {
		authfirst()
		// // Update the document title using the browser API
		//  CheckAuth()
		
		
	  },[]);

	const initialCookieState = {
		userid : "",
		passwd : "",
		cookie : ""
	}
    const [cookie, setCookie] = useState (initialCookieState)


    return (
        <AuthContext.Provider  value={{cookie, setCookie}}>
			<NavigationContainer>
				<View
				style={{
	
					paddingTop: insets.top,
					backgroundColor:'darkgrey',
		
				}}
				
				></View>
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
        </AuthContext.Provider>
       
    );
}


export default MainScreen