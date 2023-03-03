import axios from "axios";

const baseUrl = 'http://localhost:3000';


const GetAuth = async () => {
    //  일단은 내 아이디 쓰지만, 나중에 get item으로 가져오기
    console.log("시작")

    const authdata = {
        userid : "jhkim73",
        passwd : "think4u"
    }

    
    try {
    console.log("sdfsdfsdfsdf시작")
        
        let Authcheck = await axios.post(baseUrl+'/get_auth_info', authdata)   


   

         console.log(Authcheck)
        
      
         return "하이루"

    } catch(e){
     
   	   console.log(e)

       return 'ㄴㄴ'
  
    }


}

export default GetAuth
