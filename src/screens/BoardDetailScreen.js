import React, { useEffect,useState, useContext } from 'react'
import { ScrollView, View, Text  } from 'react-native';


import Replies from '../components/Replies';

import DetailContent from '../components/DetailContent';
import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';



var iconv = require('iconv-lite');
const cheerio = require('cheerio')




const DetailScreen = ({navigation,route}) => {


const [noData, setNoData] = useState(false)
const {themeValue, tdispatch} = useContext(ThemeContext)
const {configValue} = useContext(ConfigContext)
  

  return (
    <>
	 {noData == true ? 
		<View style={{flex:1, justifyContent:"center", padding:20, alignItems:"center"}}> 
			<Text>데이터를 불러올수 없습니다.</Text>
			<Text></Text>
			<Text>로그인이 필요합니다.</Text>


			
		</View> :
        <View style = {{flex:1, backgroundColor: themeValue.Reply.RbackgroundColor}}>
          <ScrollView >
        
	 
      
          <DetailContent route ={route} noData = {noData} setNoData ={setNoData} />
      
          <Replies route = {route}/>

        

          </ScrollView> 
        </View>
	}

    </>
  )
}


export default DetailScreen