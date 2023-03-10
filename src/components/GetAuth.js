import axios from "axios";
import React, { useEffect,useState, useContext } from 'react'
// import AuthContext from "../store/AuthContext";




const GetAuth = async (Value) => {
    //  일단은 내 아이디 쓰지만, 나중에 get item으로 가져오기
    // console.log("시작")
    const baseUrl = 'http://localhost:3000';

    // const {authValue, setAuthValue} = useContext(AuthContext)


    const authdata = {
        userid : Value.userid,
        passwd : Value.passwd
        // link : postdata.link
    }

    // let Authcheck = await axios.post(baseUrl+'/get_auth_info',authdata )
    // console.log("결과", Authcheck.data)

    // return Authcheck.data
    try {
   

         let Authcheck = await axios.post(baseUrl+'/get_auth_info', authdata)
         const AuthCookieNumber = Authcheck.data['set-cookie'].length
        //  console.log("어스 체크1", Authcheck.data['set-cookie'].length)

        if (AuthCookieNumber == 4){
            console.log("새 쿠키 얻음")
            // await setAuthValue(prevState => ({...prevState, cookie : Authcheck.data['set-cookie']}))
            // console.log("쿠키는 ", authValue)

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
