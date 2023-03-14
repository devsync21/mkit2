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

// import { MaterialIcons } from '@expo/vector-icons'; 




const Themes =[
    {id:1, name: '기본 테마', themeid:1},
    {id:2, name: '레몬 테마', themeid:2},
    {id:3, name: '다크 기본 테마', themeid:8},
    {id:4, name: '다크 블루 테마', themeid:9},

]



// 메인 함수
const SettingThemeScreen = () => {
    const {themeValue, tdispatch} = useContext(ThemeContext)
	const {configValue} = useContext(ConfigContext)

    const [select, setSelect] = useState(1)

    const onPressid = (item) => {
        setSelect(item.id)
        tdispatch({type: 'CHANGE_THEME', value :SettingTheme(8) })  //iem.themeid로 바꾸기
    }

    const ThemeLine = (item) => {

        return (
            <TouchableOpacity onPress={()=> onPressid(item.value)}>
            <View style={{height:90, flexDirection:'row', justifyContent:'space-between',
                        paddingHorizontal:15, alignItems:'center',
                        borderWidth:1, borderColor:'darkgrey'}}
                        >
                <Text>{item.value.name} </Text>
                { item.value.id === select ? 
                <MaterialIcons name="check" size={24} color="black" /> : <Text></Text>
    }
            </View>
            </TouchableOpacity>
        )
    }
	
    return (
        <>
            <View>
                {Themes.map((item, id)=>{
                    return(
                    <ThemeLine value={item} key={id}/>
                    )
                })}
              
            </View>
            
        </>
    )
}

export default SettingThemeScreen