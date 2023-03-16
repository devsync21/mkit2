import React, { useContext} from 'react'
import { StyleSheet, Text, View, Button, FlatList, 
    Image, SafeAreaView, TouchableOpacity,
    ActivityIndicator,  Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';



const BottomMenuTitle = ({navigation, route, pressSearch} ) => {
    const {themeValue, tdispatch} = useContext(ThemeContext)
    const {configValue} = useContext(ConfigContext)

    // console.log("???", pressSearch)
    const goBack = () => {
  
        navigation.toggleDrawer();
        
    }


    return (
        <View style = {{  
            
            width: "100%",
            height: "100%",
        
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

                

                        <MaterialIcons name="edit" size={24} color="transparent" />
                


                    <Text style= {{fontWeight:'bold', color:themeValue.Title.TBottomMenufontColor}}>
                        {route.params.titleName}
                        </Text>

                
                    <TouchableOpacity onPress={pressSearch}>

                        <MaterialIcons name="search" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goBack}>

                        <MaterialIcons name="edit" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
                    </TouchableOpacity>
            
                

    
        </View>
  )
}

export default BottomMenuTitle