import axios from "axios";



const GetAuth = async () => {
    //  일단은 내 아이디 쓰지만, 나중에 get item으로 가져오기
    // console.log("시작")
    const baseUrl = 'http://localhost:3000';


    const authdata = {
        userid : "jhkim73",
        passwd : "think4u2",
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
