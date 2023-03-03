// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import GetBoardTitles from './src/components/GetBoardTitles';

//navigation v6
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Test2 from './src/components/Test2';

import DrawerMenu from './src/components/drawer/DrawerMenu';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DrawerMenu" component={DrawerMenu} />
      
    </Drawer.Navigator>
  );
}

export default function App() {
  // navigation.openDrawer();
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="DrawerMenu">


          <Drawer.Screen name="DrawerMenu" component={DrawerMenu} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  innercontainer :{
    // padding:20,
    flex: 1,

    // backgroundColor: 'blue',

    
  }
});
