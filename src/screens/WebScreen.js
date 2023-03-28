import React, { useEffect,useState, useContext } from 'react'

import { WebView } from 'react-native-webview';
import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
import AuthContext from '../store/AuthContext';
// import CookieManager from '@react-native-cookies/cookies';



export default function WebScreen() {

	const {authValue, setAuthValue} = useContext(AuthContext)

	const uri = 'http://m.missyusa.com/mainpage/boards/board_read.asp?id=talk13&page=1&category=0&key_field=&mypost=0&key_word=&idx=4301969&ref=3657077&step=1&level=0'
	// console.log(authValue)
	console.log(authValue.cookie['set-cookie'][1])
	
	const cookie =authValue.cookie['set-cookie']
	let coo = 'saveid=: expires=Sun, 27-Mar-2022 07:00:00 GMT: path=/; MissyUSA=secu=6202af00123804574717ee2497caa28a&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok: domain=missyusa.com: path=/; savepw=: expires=Sun, 27-Mar-2022 07:00:00 GMT: path=/; ASPSESSIONIDCQAASRQR=NOGMMEPAHNCOLDCKKODBNCAJ: path=/'

	// for (i=0; i<cookie.length; i++){

	// 	coo =  coo + cookie[i] + '; ' 
	// 	console.log(i, cookie[i])
	// }

	// console.log("total",coo)

	const loginCookie = ' MissyUSA=secu=db7af01cb9bced674920f2268f8675ee&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok; domain=missyusa.com; path=/'

	const runFirst = `
    window.document.cookie = ${loginCookie};
    true; // note: this is required, or you'll sometimes get silent failures
 	 `;


	const Cookie= "__qca=P0-1916131976-1671221339080; _ga=GA1.1.1065826753.1679943432; __gads=ID=b18992079a09125b:T=1679943431:S=ALNI_MZ9-V19F6wR6iCpptl0gO2Zkw5G7g; ASPSESSIONIDCQAASRQR=OECMOEPAPMFLJILAAMENLEEH; __gpi=UID=00000a3244a349bf:T=1679943431:RT=1680010172:S=ALNI_MbOI_ktg-24tDlXYThQDhdWaSCUqw; _ga_GZT8WBC5BM=GS1.1.1680010173.2.1.1680010473.0.0.0; _ga_HYVXTN0P7X=GS1.1.1680010879.2.0.1680010881.0.0.0; MissyUSA=secu=10c458b38111a8ed5023331920f3b393&MemberPermit=3&UserNick=%BD%C2%C8%F1%B8%BE&UserName=jinhee+kim&UserID=jhkim73&Login=loginok"


	return (
		<WebView
		style={styles.container}
		originWhitelist={['*']}
		sharedCookiesEnabled={true}
		injectedJavaScriptBeforeContentLoaded={runFirst}
		source={{ uri: uri ,
			headers: {
				Cookie: Cookie
			}
		}}
		// onLoadEnd={() => {
		// 	CookieManager.getAll().then((cookies) => {
		// 		console.log('CookieManager.getAll =>', cookies);
		// 	});
		// }}
		
		/>
	);
}


const styles = StyleSheet.create({
    container:{
		backgroundColor:'skyblue'

    }

}); 