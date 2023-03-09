
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetAuth from './GetAuth';
import moment from 'moment';


// 제일 처음 프로그램을 시작하면 하는 시작점. 데이터들을 불러온다.




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

const InitData =  async () => {
    try {
       
       



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

export default InitData
