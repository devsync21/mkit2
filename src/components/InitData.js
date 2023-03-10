
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetAuth from './GetAuth';
import moment from 'moment';


// 제일 처음 프로그램을 시작하면 하는 시작점. 데이터들을 불러온다.




const initialAuthState = {
    userid : "",
    passwd : "",
    cookie : ""
}

const initialSetState = {
    theme : 1,
    style : {
        fontSize : 15
    },
    
}


const CookieParse = (items) => {
    // console.log('parse ', items['set-cookie'][0])
    // const item = items['date']
    
    const cookieTime = moment(items['date']).utc().format()
    const timeDiff = moment().diff(cookieTime,'minutes')
    
    
   

    console.log (timeDiff)
   
    // console.log(expiretime.getTime())

}

const initAuthData = async (value) => {
    const jsonvalue = value != null ? JSON.parse(value) : null;

        if (jsonvalue !== null) {
            // We have data!!

            // console.log(jsonvalue.userid);
            // if (jsonvalue.cookie == "" || null) {

		    //     const Authinfo =  await GetAuth()
               
            //     const parse = await CookieParse(Authinfo)
               
            // }

            return jsonvalue

        } else {    // no data.. 아마도 처음 시작할때일듯.

            // console.log(value);
            return initialAuthState
            
        }
    
}

const initSetData = async (value) => {
    const jsonvalue = value != null ? JSON.parse(value) : null;

        if (jsonvalue !== null) {
            // We have data!!
           
          

            return jsonvalue

        } else {

            
            return initialSetState
            
        }
    
}

const InitData =  async () => {
    try {
       
        const avalue = await AsyncStorage.getItem('@auth')
        const authValue = await initAuthData(avalue)

        const svalue = await AsyncStorage.getItem('@setting')
        const setValue = await initSetData(svalue)

        return {authValue, setValue}
   
    } catch (error) {
        // Error retrieving data
        console.log(error);

        return error

    }
  };

export default InitData
