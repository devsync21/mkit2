// import axios from "axios";
import instance from '../api/Api';

import React, { useEffect,useState, useContext } from 'react'
// import AuthContext from "../store/AuthContext";

import AuthContext from '../store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';





const GetAuth = async (Value) => {
    // console.log('testing')

    // const {authValue, setAuthValue} = useContext(AuthContext)
    // const baseUrl = 'http://localhost:3000';

    const authdata = {
        userid : Value.userid,
        passwd : Value.passwd
     }

     // 링크도 같이 보내야 하나???/

 
    try {
   

         let Authcheck = await instance.post('/get_auth_info', authdata)
         const AuthCookieNumber = Authcheck.data['set-cookie'].length

         console.log('in get auth', Authcheck.data['set-cookie'])

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

const storeData = async (cookie,auth) => {
    console.log('storeData',cookie)
    // const {authValue, setAuthValue} = useContext(AuthContext)

    const value = {
        userid : auth.userid,
        passwd : auth.passwd,
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
