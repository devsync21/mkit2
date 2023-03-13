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
const SettingThemeScreen = () => {
	
    return (
        <>
            <Text>setting theme</Text>
        </>
    )
}

export default SettingThemeScreen