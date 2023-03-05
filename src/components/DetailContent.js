import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity,ScrollView  } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "axios";


import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLElementModel, HTMLContentModel }  from 'react-native-render-html';

import GetAuth from './GetAuth';

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
			// console.log("changed", $(node).attr('src'))
		} else {
		//   console.log(times,"&&&&&&&&&&&&&&&&&&&&",times, $(node))
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
const DetailContent = ({route}) => {

	// console.log(route.params.data2.rule)
	const needAuth = route.params.data2.rule

	const [detail, setDetail] = useState("")
	const baseUrl = 'http://localhost:3000';
	const info = route.params

	const source = {
		html: detail
	};

	const { width } = useWindowDimensions();

	const postdata = {
		link :info.data1.link
	}



  const getDetailAxios = async () =>{
	if (!needAuth){
		console.log ("auth 가 필요합니다. ")
		const Authinfo =  await GetAuth(postdata)
		console.log("auth는 ", Authinfo)
		const finalHTML = processHTML (Authinfo)    

    // console.log(res)
 
		setDetail(finalHTML)
		return
	}
  
    try {
      
        let res = await axios.post(baseUrl+'/get_board_detail', postdata)   
    
     //axios 가 갑자기 안되면 adb reverse tcp:3000 tcp:3000

        
    // 주로 cheerio 이용해서 html 변환  
    const finalHTML = processHTML (res.data)    

    // console.log(res)
 
    setDetail(finalHTML)
      
    } catch(e){
     
   	   console.log(e)
  
    }

  }


  useEffect(() => {
	// // Update the document title using the browser API
	getDetailAxios()

  },[]);
  

  return (
    <>

        <ScrollView >
			<RenderHtml
			
				contentWidth={width}
				source={source}
				WebView={WebView}

				customHTMLElementModels={customHTMLElementModels}
				renderersProps={renderersProps}
				
				javaScriptEnabled={true}

				renderers={renderers}
				
				// computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
				// provideEmbeddedHeaders={provideEmbeddedHeaders}
			/>
			<Text></Text>
    
        </ScrollView> 

    </>
  )
}


export default DetailContent