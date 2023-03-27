import React, { useContext, useState, useRef, useEffect} from 'react'
import {Text, View, Button, 
        TouchableOpacity,
        Animated, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';
import { is } from 'cheerio/lib/api/traversing';
// import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 



const BottomMenuDetail = ({navigation, route} ) => {
    const {themeValue, tdispatch} = useContext(ThemeContext)
    const {configValue} = useContext(ConfigContext)

    // console.log("is searching?",isSearching)

    const goBack = () => {
  
        navigation.goBack();
        
    }
    const onPresstest =() => {
        
        navigation.navigate('WebScreen')

    }
    

    return (
        <View style = {{  
					
            width: "100%",
            backgroundColor: themeValue.Title.TbottomMenuBackgroundColor,
            flexDirection:'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            // alignItems:'center',
            justifyContent: 'space-between'
        }}>

            <TouchableOpacity onPress={goBack}>
                <MaterialIcons name="arrow-back-ios" size={24}
                style={{color: themeValue.Title.TBottomMenufontColor}}
                />
            </TouchableOpacity>
            
            <MaterialIcons name="refresh" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
            <MaterialIcons name="comment" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
            <FontAwesome name="heart-o" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
            <TouchableOpacity onPress={onPresstest}>
            <MaterialIcons name="save-alt" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
            </TouchableOpacity>

        </View>
  )
}

export default BottomMenuDetail