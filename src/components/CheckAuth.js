
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetAuth from './GetAuth';
import moment from 'moment';


// 진행하는 과정에 대해서 알아보자

// 1. 처음에 저장되어 있는 내용을 불러본다.
// 1 - 1 : 저장되어 있는게 아무것도 없음    -->  볼수 없다고 그냥 표시하는 수밖에
// 1 - 2 : 아이디 저장은 되어 있으나 쿠키는 없음  -->  쿠키 받아오기
// 1 - 3 : 아이디 쿠키 모두 저장되어 있음
            //      1-3-1 : 쿠키가 시간이 지났거나   --> 쿠키 받아오기
            //      1-3-1 : 쿠키가 시간이 안 지났는데 에러나거나 --> 쿠키 받아오기
            //      1-3-1 : 다 잘되는 경우






const initialCookieState = {
    userid : "jhkim73",
    passwd : "think4u",
    cookie : ""
}




const CookieParse = (items) => {
    // console.log('parse ', items['set-cookie'][0])
    // const item = items['date']
    
    const cookieTime = moment(items['date']).utc().format()
    const timeDiff = moment().diff(cookieTime,'minutes')
    
    
   

    console.log (timeDiff)
   
    // console.log(expiretime.getTime())

}

const CheckAuth =  async () => {
    try {
        //지울 내용임
        const tempauth = JSON.stringify(initialCookieState)
        await AsyncStorage.setItem('@auth', tempauth);
        //지울 내용임



        const value = await AsyncStorage.getItem('@auth')
        const jsonvalue = value != null ? JSON.parse(value) : null;

        if (jsonvalue !== null) {
            // We have data!!
            console.log(jsonvalue.userid);
            if (jsonvalue.cookie == "" || null) {

		        const Authinfo =  await GetAuth()
                // const hhh = {"cache-control": "no-cache", "connection": "close", "content-length": "239", "content-type": "text/html", "date": "Tue, 07 Mar 2023 22:25:10 GMT", "expires": "Tue, 07 Mar 2023 22:25:10 GMT", "pragma": "no-cache", "server": "Microsoft-IIS/10.0", "set-cookie": ["saveid=; expires=Mon, 07-Mar-2022 08:00:00 GMT; path=/", "MissyUSA=secu=fea69e5fadb515f488ed754c7c94f503&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok; domain=missyusa.com; path=/", "savepw=; expires=Mon, 07-Mar-2022 08:00:00 GMT; path=/", "ASPSESSIONIDCQDCSTTS=LCAKJMGDDPKKDIIIABDALKDN; path=/"]}

                const parse = await CookieParse(Authinfo)
                
                // console.log(">>>>",Authinfo)
                // console.log(">>>>",Authinfo['set-cookie']['MissyUSA'])


                
            }

            return value

        } else {

            console.log(value);
            return initialCookieState
            
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);

        return error

    }
  };

export default CheckAuth
