import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, FlatList,SafeAreaView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {
  CommonActions,
  DrawerActions,
  DrawerNavigationState,
  ParamListBase,
  useLinkBuilder,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';








const CustomDrawer = (props) => {
  // 메뉴가 접혀있는지 열려있는지
  const [sectionMenu, setSectionMenu] = useState([
      {isOpened: true},
      {isOpened: true},
      {isOpened: true},
      {isOpened: true},
      {isOpened: true},
      
  ])
   



///////////////////////////////// 새로운 커스텀 메뉴들

  const DrawerItemListCustom = (props) =>{
    // console.log(props)

    const buildLink = useLinkBuilder();

    const focusedRoute = props.state.routes[props.state.index];
    const focusedDescriptor = props.descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;
  
    const {
      drawerActiveTintColor,
      drawerInactiveTintColor,
      drawerActiveBackgroundColor,
      drawerInactiveBackgroundColor,
    } = focusedOptions;
  
    return props.state.routes.map((route, i) => {



      if (props.showList.includes(route.params.category)){

      
      const focused = i === props.state.index;
      
      const onPress = () => {
        
        const event = props.navigation.emit({
          type: 'drawerItemPress',
          target: route.key,
          canPreventDefault: true,
        });
  
        if (!event.defaultPrevented) {
          props.navigation.dispatch({
            ...(focused
              ? DrawerActions.closeDrawer()
              : CommonActions.navigate({ name: route.name, merge: true })),
            target: props.state.key,
          });
        }
      };
  
      const {
        title,
        drawerLabel,
        drawerIcon,
        drawerLabelStyle,
        drawerItemStyle,
        drawerAllowFontScaling,
      } = props.descriptors[route.key].options;


    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        focused={focused}
        activeTintColor={drawerActiveTintColor}
        inactiveTintColor={drawerInactiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        inactiveBackgroundColor={drawerInactiveBackgroundColor}
        allowFontScaling={drawerAllowFontScaling}
        labelStyle={drawerLabelStyle}
        style={drawerItemStyle}
        to={buildLink(route.name, route.params)}
        onPress={onPress}
      />
    ); 
    }    // if 의  closing 
  })
  }


  const showHideMenu = (e, id) =>{
    const sectionMenuTemp = sectionMenu
   
    const selectedSec = sectionMenuTemp.map((item, index) => {
   
      if (index === id)  item.isOpened = !item.isOpened
      return item
    }, [])
    setSectionMenu(selectedSec)
   
  }

  // Drawer styles

  const styleDrawerSection = {
    //  color: "#609806", 
    Textcolor: 'white',
    backgroundColor :'darkgrey', 
    height: 40
    

  }
  const styleDrawerSectionFixed = {
    //  color: "#609806", 
    Textcolor: 'white',
    backgroundColor :'darkgrey', 
    height: 40,
    marginBottom: -24,  // 너무 대충 구한것 같기도 하고...방법 찾기
    zIndex: 10
    

  }

  const labelStyleDrawerSection = {
    color : 'white',
    fontSize : 12,
    
  }
  // safe area를 구하는 함수
  const insets = useSafeAreaInsets();

  return (
    <View    style={{
        flex: 1,
  
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      
      }}>



          <DrawerItem 
             
             style={styleDrawerSectionFixed}
             labelStyle = {labelStyleDrawerSection}
             label="My favorite"              
             onPress={e => showHideMenu(e, 0)}
           />

      <DrawerContentScrollView {...props}>

            <DrawerItem 
             
              style={styleDrawerSection}
              labelStyle = {labelStyleDrawerSection}
              label="Talk Lounge"              
              onPress={e => showHideMenu(e, 0)}
            />

            {sectionMenu[0].isOpened === true ?
            <View >
            <DrawerItemListCustom {...props} 
                showList = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14]}                       
              />
            </View>  : <View></View>
            }




            <DrawerItem 
              label="Health & Beauty"
              style={styleDrawerSection}
              labelStyle = {labelStyleDrawerSection}

              onPress={e => showHideMenu(e, 1)}
            />  

        
             {sectionMenu[1].isOpened === true ?
            <View >
            <DrawerItemListCustom {...props} 
                 showList = {[15,16,17,18,19,20]}                       
                   
              />
            </View>  : <View></View>
            } 


            <DrawerItem 
              label="Home & Food"
              style={styleDrawerSection}
              labelStyle = {labelStyleDrawerSection}

              onPress={e => showHideMenu(e, 1)}
            />  

        
             {sectionMenu[1].isOpened === true ?
            <View >
            <DrawerItemListCustom {...props} 
                 showList = {[31,32,33,34,35,36,37,38,39,40]}                       
                   
              />
            </View>  : <View></View>
            } 
   


            <DrawerItem
              label="Help"
              onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
      </DrawerContentScrollView>
      <View>
          <Text>Our Custom Text</Text>
      </View>
    </View>
  )
}

// 스타일에 관련된 함수들
const styles = StyleSheet.create({
  DrawerItemListCustomContainer : {
    paddingHorizontal : 15,
    paddingVertical : 10,

  },
  sectionMenu : {
    // borderColor: 'red'
  }

});
export default CustomDrawer