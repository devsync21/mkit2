import React, { useEffect, useState, useContext, useMemo, useRef, useCallback  } from 'react'
import { StyleSheet, Text, View, Button, FlatList, 
          Image, SafeAreaView, TouchableOpacity,
          ActivityIndicator,  Pressable, Animated } from 'react-native';

import instance from '../api/Api';


import SectionInfo from '../components/SectionInfo';
import BottomMenuTitle from '../components/BottomMenuTitle';


// import { useWindowDimensions } from 'react-native';


import { useDrawerStatus } from '@react-navigation/drawer';

// import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 
// import { useDrawerStatus } from '@react-navigation/drawer';
// 한참후에 페이지 바뀐뒤에 스크롤하면 어떻게 될까???? 궁금.

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';




// adb reverse tcp:8000 tcp:8000
const BoardSearchScreen = ({ navigation, route }  ) => {

const {searchText, section, sectionid, category} = route.params    
   

const [dataT, setDataT] = useState([])
const [onMomentumScrollBeginBoolean,setOnMomentumScrollBeginBoolean] = useState(false)
const [isLoading, setIsLoading] = useState(true)


// const [isSearching, setIsSearching] = useState (false)
// const [currentPage, setcurrentPage] = useState(1)
const [searchPage, setSearchPage] = useState(1)

// const [searchText, setSearchText] = useState("")
// const [searchTextNew, setSearchTextNew] = useState("")



// const [modalVisible, setModalVisible] = useState(false)


const {themeValue, tdispatch} = useContext(ThemeContext)
const {configValue} = useContext(ConfigContext)

//모달에 관련된 내용들 시작

//모달에 관련된 내용들 끝

 


// section에 대한 정보들 얻어오기
let sectioninfo = SectionInfo[category]

// drawer가 열려 있으면 클릭했을때 drawer 닫기
const isDrawerOpen = useDrawerStatus() === 'open';



// 검색했을때 게시판 글 제목 가져오는 함수
const getSearchTitleAxios = async (searchPage) =>{

	console.log("axios working")
	  try {
	  let res = await instance.post('/get_board_search_title_lists/'+ section+'/'+ sectionid + '/' + searchPage,
	  {text:searchText}
	  )   
	

	  if (searchPage > 1){
  
		
		    const newData = dataProcess(res.data)
	   
		    setDataT(newData)
		// console.log("두번째부터 데이터 넣기... 같은거 제거",newData, dataT , currentPage)
  
		
	  } else {
		    setDataT(res.data)
	  
		   
	  }
	  
	  setIsLoading(false)
  
	} catch(e){
	  setDataT([])
	  console.log("error is :",e)
  
	
  
  }
}




useEffect(() => {
    // Update the document title using the browser API
	
    getSearchTitleAxios(searchPage)

},[searchPage]);  


useEffect(() => {
    // Update the document title using the browser API
    setSearchPage(1)

   
},[route]);  



// 받아온 데이터 가공
const dataProcess = (resDatat) => {
  //새로 받아온거 데이터에 합치고, 중복된거 제거
   

   let dataNew = dataT
   dataNew = [...dataNew, ...resDatat]

   

   var result = dataNew.reduce((unique, o) => {
       if(!unique.some(obj => obj.title === o.title )) {
         unique.push(o);
       }
       return unique;
   },[]);

  //  console.log("같은거 제거하는 함수", result)
   return result
   
}

// flatlist 끝에 도달했을때
const onEndReached = () => {

    // setcurrentPage(currentPage+1)
    if(onMomentumScrollBeginBoolean==true){
      // this.fetchData();
      // console.log('끝에 도달해서 다음 페이지 가져오라고 하는 함수')
      setSearchPage(searchPage + 1)
		

      setOnMomentumScrollBeginBoolean(false) 
  }
    return
  }
  
  // flatlist 스크롤 중인지 판단
  const onMomentumScrollBegin = () => {

    // console.log(onMomentumScrollBeginBoolean)
    setOnMomentumScrollBeginBoolean(true)
 
  }


  // flatList 렌더링 하는 함수
  const renderItem = ({item}) => {
   
    const repl = item.repl.replace('[','').replace(']','')
    

	
    return (
      <TouchableOpacity
      // onPress={this.itemClick(item)}
      onPress={() =>  
        {  
          
          if (isDrawerOpen) {
            
            navigation.toggleDrawer();

            return
          } else {
            navigation.navigate('BoardDetailScreen', {data1: item, data2: sectioninfo})
          }
          
        }
      
      }
      
    >
        <View style={{
				flexDirection : "column",
				paddingHorizontal: 10,
				paddingVertical : 12,
				
				borderBottomWidth: 1,
				borderColor: themeValue.Title.TborderColor,      
				backgroundColor: themeValue.Title.TbackgroundColor}}>
          
              <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                  
                
                    <View style = {{paddingRight:35}}>
                          <Text style = {{fontSize: configValue.TTfontSize,
										color: themeValue.Title.TfontColor
										
										}}>
                            { item.youtubeicon.length > 0 ? 
                                    <Image source={require('./../../assets/icon_youtube.gif')}/>: <Text></Text>
                                }
                          
                            {item.title}

                          </Text>
                    </View>
                     { item.repl ? 

                                                        
                    <View style = {{position: 'absolute', right : 0, top: 0, width:25, height: 25, 
									backgroundColor: themeValue.Title.TreplBackgroundColor,
                                	alignItems : 'center', justifyContent:'center', borderRadius:25
                                  
                                  }}>

                       <Text style = {{fontSize: 11, color:themeValue.Title.TreplfontColor}}>{repl}</Text>
                    </View>    : <View></View>
                    }
                  
            </View>
           
      


            <View style = {{flexDirection:'row', marginTop:5}}>
              <Text style = {{fontSize:11, marginRight: 10,
              color:  themeValue.Title.TsmFontColor
              }}>{item.date}</Text>
              
              <Text style = {{fontSize:11, color:  themeValue.Title.TsmFontColor}}> {item.read} </Text>
            </View>

        </View>
      </TouchableOpacity>
    );  
  
  }
  
  // const isDrawerOpen = useDrawerStatus() === 'open';

  // 검색 버튼 누르면 검색하는 함수
 

  const pressSearch = () => {
	// console.log("press search", searchText)
	// setIsSearching(true)
	
  }

// 메인 함수의 리턴.
  return (

    <View style ={{
        flex:1,
        backgroundColor: themeValue.Title.TbackgroundColor
    }}>

      {
        isLoading === true ?
        // axios에서 제목 목록 불러올때까지 로딩중 표시

      <View style = {{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeValue.Title.TbackgroundColor
               
        }}>
        <ActivityIndicator size='small' style={{marginRight:5}}></ActivityIndicator>  
        <Text style = {{color: themeValue.Title.TfontColor}}>데이터를 불러오는 중입니다.</Text>


      </View>
	  :

	  <View >
			
		<FlatList 
			data={dataT}
			renderItem={renderItem}
			keyExtractor={(item,index) => index.toString()}

			onEndReachedThreshold={0.5}
			onEndReached={onEndReached}
			onMomentumScrollBegin={onMomentumScrollBegin}    
			// onRefresh = {onRefresh}
		/> 

  		</View> 
		
		
      }

      {/* 하단에 메뉴 */}

		<View 
	
			style={{
				position:'absolute',
				bottom:0,
				width:'100%',
				height: 45,			
			}}>

			<BottomMenuTitle
				// route = {route}
                sectioninfo = {sectioninfo}
				navigation = {navigation}
				pressSearch = {pressSearch}
				searchText = {searchText}
				// setSearchText = {setSearchText}
					/>
		</View>

      {/* 하단에 메뉴 끝*/}

			
		  
			
	</View>  

	
  )
}



// 리턴에 관련된 함수들





export default BoardSearchScreen