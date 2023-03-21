import React, { useEffect,useState, useContext } from 'react'
import { ScrollView, View, Text, TouchableOpacity   } from 'react-native';


import Replies from '../components/Replies';

import DetailContent from '../components/DetailContent';
import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';

import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useWindowDimensions } from 'react-native';





var iconv = require('iconv-lite');
const cheerio = require('cheerio')




const BoardDetailScreen = ({navigation,route}) => {


const [noData, setNoData] = useState(false)
const {themeValue, tdispatch} = useContext(ThemeContext)
const {configValue} = useContext(ConfigContext)

const flatlistHeight = useWindowDimensions().height - 65
// console.log("f height", flatlistHeight)
const goBack = () => {
  
	navigation.goBack();
	
  }  

useEffect(()=> {
	// console.log("detail")
	navigation.getParent().setOptions({ swipeEnabled: false })

},[])



  return (
    <>
		{noData == true ? 
			<View style={{flex:1, justifyContent:"center", padding:20, alignItems:"center"}}> 
				<Text>데이터를 불러올수 없습니다.</Text>
				<Text></Text>
				<Text>로그인이 필요합니다.</Text>
			</View> :

			<View style = {{flex:1, backgroundColor: themeValue.Reply.RbackgroundColor,height: flatlistHeight}}
				>
				<ScrollView >
					<DetailContent route ={route} noData = {noData} setNoData ={setNoData} />
				
					<Replies route = {route}/>
				</ScrollView> 
					{/* 하단에 메뉴 */}
				  	<View style = {{  
					
						width: "100%",
						backgroundColor: themeValue.Title.TbottomMenuBackgroundColor,
						flexDirection:'row',
						paddingHorizontal: 20,
						paddingVertical: 10,
						// alignItems:'center',
						justifyContent: 'space-between'
					}}>
		  
						<TouchableOpacity onPress={goBack}>
							<MaterialIcons name="arrow-back-ios" size={24}
							style={{color: themeValue.Title.TBottomMenufontColor}}
							/>
						</TouchableOpacity>
						
						<MaterialIcons name="refresh" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
						<MaterialIcons name="comment" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
						<FontAwesome name="heart-o" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
						<MaterialIcons name="save-alt" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
	
		  
					</View>
			</View>
		}

    </>
  )
}


export default BoardDetailScreen