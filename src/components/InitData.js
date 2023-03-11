
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetAuth from './GetAuth';
import moment from 'moment';

import {SettingTheme, SettingConfig} from '../api/SettingTheme';



// 제일 처음 프로그램을 시작하면 하는 시작점. 데이터들을 불러온다.




const initialAuthState = {
    userid : "jhkim73",
    passwd : "think4u",
    cookie : ""
}



// auth를 초기화하는 함수
const initAuthData = async (value) => {
    const jsonvalue = value != null ? JSON.parse(value) : null;

        if (jsonvalue !== null) {
            // We have data!!

            return jsonvalue

        } else {    // no data.. 아마도 처음 시작할때일듯.

            // console.log(value);
            return initialAuthState
            
        }
    
}

// 테마를 초기화하는 함수
const initThemeData = async (value) => {
    const jsonvalue = value != null ? JSON.parse(value) : null;


        if (jsonvalue !== null) {
            // We have data!!

            return jsonvalue

        } else {
            const iss = SettingTheme(1)
            
            return iss
            
        }
    
}

// 나머지 세팅을 초기화하는 함수
const initConfigData = async (value) => {
    const jsonvalue = value != null ? JSON.parse(value) : null;


        if (jsonvalue !== null) {
            // We have data!!

            return jsonvalue

        } else {
            const iss = SettingConfig
            
            return iss
            
        }
    
}

// 메인 함수
const InitData =  async () => {
    try {
       
        const avalue = await AsyncStorage.getItem('@auth')
        const authValue = await initAuthData(avalue)

        const tvalue = await AsyncStorage.getItem('@theme')
        const themeValue = await initThemeData(tvalue)

        const cvalue = await AsyncStorage.getItem('@setting')
        const configValue = await initConfigData(cvalue)

        return {authValue, themeValue, configValue}
   
    } catch (error) {
        // Error retrieving data
        console.log(error);

        return error

    }
  };

export default InitData
