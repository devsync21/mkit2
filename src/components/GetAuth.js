import axios from "axios";
import instance from '../api/Api';

import React, { useEffect,useState, useContext } from 'react'
// import AuthContext from "../store/AuthContext";




const GetAuth = async (Value) => {
  
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

export default GetAuth
