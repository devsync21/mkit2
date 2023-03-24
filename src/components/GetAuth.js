// import axios from "axios";
import instance from '../api/Api';

import React, { useEffect,useState, useContext } from 'react'
// import AuthContext from "../store/AuthContext";

import AuthContext from '../store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';





const GetAuth = async (Value) => {
    const {authValue, setAuthValue} = useContext(AuthContext)
    // const baseUrl = 'http://localhost:3000';

    const authdata = {
        userid : Value.userid,
        passwd : Value.passwd
     }

 
    try {
   

         let Authcheck = await instance.post('/get_auth_info', authdata)
         const AuthCookieNumber = Authcheck.data['set-cookie'].length

        if (AuthCookieNumber == 4){
 
            return Authcheck.data

        } else {
            return 0
        }
    

    } catch(e){
     
   	   console.log(e.message)

       return 0
  
    }

}

const storeData = async (cookie) => {
    console.log('storeData')
    const value = {
        userid : authValue.userid,
        passwd : authValue.passwd,
        cookie : cookie
    }

    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

export  {GetAuth,storeData}
