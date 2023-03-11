import React, { useEffect,useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity, ScrollView  } from 'react-native';
import { WebView } from 'react-native-webview';
// import axios from "axios";
import instance from '../api/Api';


import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLElementModel, HTMLContentModel }  from 'react-native-render-html';

import GetAuth from './GetAuth';
import AuthContext from '../store/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




var iconv = require('iconv-lite');
const cheerio = require('cheerio')



/////////////// react-native-render-html 관련된 함수들 시작

const customHTMLElementModels = {
	iframe: iframeModel,

	'font': HTMLElementModel.fromCustomModel({
		tagName: 'font',
		mixedUAStyles: {
	
		
		},
		contentModel: HTMLContentModel.block
	}),

	'ytd-expander': HTMLElementModel.fromCustomModel({
		tagName: 'ytd-expander',
		mixedUAStyles: {

		},
		contentModel: HTMLContentModel.block
	}),

	'yt-formatted-string': HTMLElementModel.fromCustomModel({
		tagName: 'yt-formatted-string',
	
		contentModel: HTMLContentModel.block
	})
};

const renderersProps = {
	img: {
		enableExperimentalPercentWidth: true
	},

	iframe: {
		scalesPageToFit: true,
		
		webViewProps: {
		/* Any prop you want to pass to iframe WebViews */
		
		}
	}

};

const renderers = {
  iframe: IframeRenderer
};
/////////////// react-native-render-html 관련된 함수들 끝


/////////////// 나머지 잡다한 함수들 시작

const processHTML = (data) => {
    const $ = cheerio.load(data)
    const imgSrc = $('img')


    //이미지 중에 서버에 있는 이미지는 앞에 https..를 붙여준다
    let  times =1
    imgSrc.each((idx, node) => {
		const eachImgSrc = $(node).attr('src')

		if (eachImgSrc.substring(1,11) == "fileServer"){
			const new_ImgSrc = "http://m.missyusa.com"+$(node).attr('src')
			$(node).attr("src", new_ImgSrc)
		
		} else {
		
			times++
		}
      
    })

    const iframehtml1 = $.html('iframe')
    const iframehtml2 = "<br/>" + iframehtml1 + "<br/>"

    const finalHTML2  = $.html().replace(iframehtml1, iframehtml2 )

    // 안되는것 1  여러개의 사진 나오면 width 아주 작게 나온다
    // <p style="max-width: 100%; height: auto; margin: 0px;"><img class="TOP fr-dib fr-fil fr-draggable" src="https://cdn.clien.net/web/api/file/F01/13884433/7104c96c4ea91e.jpg?w=780&amp;h=30000" data-file-sn="13884433" alt="i15253426127.jpg" data-role="attach-image" data-img-width="648" data-img-height="14196" style="max-width: 100%; height: auto; margin: 0px;"></p>

    //VVV 안되는것 2 font tag  => custom element 등록 했음

    //VVV 안되는것 3 아이프레임.

    

    // const tempsource = '<p style="max-width: 100%; height: auto; margin: 0px;"><img class="TOP fr-dib fr-fil fr-draggable" src="https://cdn.clien.net/web/api/file/F01/13884433/7104c96c4ea91e.jpg?w=780&amp;h=30000" data-file-sn="13884433" alt="i15253426127.jpg" data-role="attach-image" data-img-width="648" data-img-height="14196" style="max-width: 100%; height: auto; margin: 0px;"></p>'
    const tempsource = '<img  src="https://cdn.clien.net/web/api/file/F01/13884433/7104c96c4ea91e.jpg?w=780"  style="width: 100%;  margin: 0px;">'

    return finalHTML2
}

/////////////// 나머지 잡다한 함수들 끝


// 메인 펑션
const DetailContent = ({route, noData,setNoData}) => {
	// console.log('test',instance)

	// 정상적이지 않은 게시판은 rule이 false로 됨. 예를 들면 속풀이
	const needAuth = route.params.data2.rule

	// 시작할때 auth value 가져옴
	const {authValue, setAuthValue} = useContext(AuthContext)


	// 게시판 글 내용
	const [detail, setDetail] = useState("")

	// const [noData, setNoData] = useState(false)

	// const baseUrl = 'http://localhost:3000';
	const info = route.params


	const source = {
		html: detail
	};

	const { width } = useWindowDimensions();

	const postdata = {
		link :info.data1.link,
		auth : authValue
	}

	const fontSize = 15 // 나중에 세팅에서 바꿀수 있게

	const storeData = async (cookie) => {
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

  	const getDetailAxios = async () =>{

		try {
		// 제일 먼저 글을 읽어오려고 시도
			let res = await instance.post('/get_board_detail', postdata)  
		

			if (res.data.length > 0){
				const finalHTML = processHTML (res.data)    

				setDetail(finalHTML)
				// console.log("1번째 시도")
				return
			} else {
				// 이것은 무언가 문제가 있다는 뜻

				// 아이디도 없다면 방법이 없이 로그인 필요하다고 말하기
				if (authValue.userid.length = 0){
					setNoData(true)
					// console.log("2번째 시도")

				} else {   //아이디 있다면 쿠키 새로 받는거 실시
					const cookie = await GetAuth(authValue)

						if (cookie == 0 ) {
							setNoData(true)
							// console.log("3번째 시도",authValue)


						} else {
							//다시한번 시도
							// console.log("4번째 시도",cookie)
							await setAuthValue(prevState => ({...prevState,
								
									cookie : cookie
								
							}))
							// 위의 setAuthValue가 시간이 걸리는지 즉각 반영이 안되서... postdata2 만들고 대입
							const postdata2 = {
								link :info.data1.link,
								auth : {
									userid : authValue.userid,
									passwd : authValue.passwd,
									cookie : cookie
								}
							}
							// console.log(postdata,postdata2)
							// 새로 받은 쿠키를 이용해서 다시 한번 시도해본다.
							let res2 = await instance.post('/get_board_detail', postdata2)  
					
							if (res2.data.length > 0){
								const finalHTML = processHTML (res2.data)    


								// setItem 이용해서 쿠키를 로컬 스토리지에 저장하기

								storeData(cookie)


					
								setDetail(finalHTML)
								// console.log("5번째 시도")
								return
							} else {
								setNoData(true)
								// console.log("6번째 시도")

							}

						}

				}
				
				return
			}
			
		} catch(e){
			
				console.log(e)
			}
	
  	}


  useEffect(() => {
	// // Update the document title using the browser API
	// chechAuth()
	getDetailAxios()
	
  },[]);
  

  const tagsStyles = {
	div: {
	  whiteSpace: 'normal',
	  lineHeight: 20,
	  fontSize: fontSize
	 
	},
	
  };
  

  return (
    <>
    
		
		<ScrollView >
		<View style ={{paddingHorizontal:10,paddingVertical:30}}>
		<RenderHtml
		
			contentWidth={width}
			source={source}
			WebView={WebView}

			customHTMLElementModels={customHTMLElementModels}
			renderersProps={renderersProps}
			
			javaScriptEnabled={true}

			renderers={renderers}
			tagsStyles={tagsStyles}
			
			// computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
			// provideEmbeddedHeaders={provideEmbeddedHeaders}
		/>
		</View>

	</ScrollView> 
		
        

    </>
  )
}


export default DetailContent