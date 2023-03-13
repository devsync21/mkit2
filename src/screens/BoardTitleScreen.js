import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, FlatList, 
          Image, SafeAreaView, TouchableOpacity,
          ActivityIndicator } from 'react-native';
// import axios from "axios";
import instance from '../api/Api';


import SectionInfo from '../components/SectionInfo';

import { useWindowDimensions } from 'react-native';


import { useDrawerStatus } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';
// import { useDrawerStatus } from '@react-navigation/drawer';
// 한참후에 페이지 바뀐뒤에 스크롤하면 어떻게 될까???? 궁금.

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';




// adb reverse tcp:8000 tcp:8000
const BoardTitleScreen = ({ navigation, route }  ) => {

const [dataT, setDataT] = useState([])
const [onMomentumScrollBeginBoolean,setOnMomentumScrollBeginBoolean] = useState(false)
const [currentPage, setcurrentPage] = useState(1)
const [isLoading, SetIsLoading] = useState(true)


const {themeValue, tdispatch} = useContext(ThemeContext)
const {configValue, setConfigValue} = useContext(ConfigContext)


 


// section에 대한 정보들 얻어오기
let sectioninfo = SectionInfo[route.params.category-1]

// const baseUrl = 'http://localhost:3000';

// flatList 아래쪽에 메뉴 공간 만들기
const flatlistHeight = useWindowDimensions().height - 65

// drawer가 열려 있으면 클릭했을때 drawer 닫기
const isDrawerOpen = useDrawerStatus() === 'open';


const getTitleAxios = async (page_num) =>{

  
  try {
    
    let res = await instance.get('/get_board_title_lists/'+ sectioninfo.section+'/'+ sectioninfo.sectionid + '/' +page_num)   
  
    //axios 가 갑자기 안되면 adb reverse tcp:3000 tcp:3000
   
    if (currentPage > 1){

      
      const newData = dataProcess(res.data)
     
      setDataT(newData)
      // console.log("두번째부터 데이터 넣기... 같은거 제거",newData, dataT , currentPage)

      
    } else {
      setDataT(res.data)
    
      // console.log(" 처음 한번 데이터 넣기 current page", currentPage, dataT)
    }
    
    SetIsLoading(false)

  } catch(e){
    setDataT([])
    console.log("error is :",e)

  }

}

useEffect(() => {
    // Update the document title using the browser API
    getTitleAxios(currentPage)

  },[currentPage]);

useEffect(() => {
  
    setcurrentPage(1)
},[route])

// const routeName = navigation.getState().routes[0].name
// useEffect(()=> {
// 	console.log('changed drawer options')
// }, [navigation.canGoBack()])
// console.log("haha11", navigation)


//만일 디테일 정보볼때 제스쳐하면 제목 목록으로, 제목볼때는 drawer menu
const toggleGesture = () => {
	// console.log("changed", navigation.canGoBack())
	const current = navigation.getState().index
	const parent = navigation.getParent()
	// console.log("after changed ", navigation.getParent())
	if (current != 0) {
		parent.setOptions({ swipeEnabled: false })
	} else {
		parent.setOptions({ swipeEnabled: true })

	}
	// console.log("after changed 1", navigation.getState().index)
	// console.log("after changed 2", navigation.getState())
	// console.log("after changed 3", navigation.canGoBack())



}
	//만일 디테일 정보볼때 제스쳐하면 제목 목록으로, 제목볼때는 drawer menu
	useEffect(() => {
	const unsubscribe = navigation.addListener('transitionEnd', (e) => {
		// console.log("changed",e)
		toggleGesture()
	  // Do something
	});
  
	return unsubscribe;
  }, [navigation]);


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
      setcurrentPage(currentPage + 1)

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
            navigation.navigate('DetailScreen', {data1: item, data2: sectioninfo})
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
              
              <Text style = {{fontSize:11, color:  themeValue.Title.TsmFontColor}}>{item.read} </Text>
            </View>

        </View>
      </TouchableOpacity>
    );  
  
  }
  
  // const isDrawerOpen = useDrawerStatus() === 'open';
const goBack = () => {
  
  navigation.toggleDrawer();
  
}



// 메인 함수의 리턴.
  return (
    <View >
      {
        isLoading === false ?


     
          
      <View >
          
          <FlatList style={{height: flatlistHeight}}
            data={dataT}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}

            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            onMomentumScrollBegin={onMomentumScrollBegin}    
            // onRefresh = {onRefresh}
          /> 

      </View> :

      // axios에서 제목 목록 불러올때까지 로딩중 표시
      <View style = {{
        height: flatlistHeight, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
               
        }}>
        <ActivityIndicator size='small' style={{marginRight:5}}></ActivityIndicator>  
        <Text>데이터를 불러오는 중입니다.</Text>

      </View>

      }
   

      {/* 하단에 메뉴 */}
      <View style = {{  
          
            width: "100%",
            height: "100%",
           
            backgroundColor: '#ababab',
            flexDirection:'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
            // alignItems:'center',
            justifyContent: 'space-between'
            }}>
                <TouchableOpacity onPress={goBack}>
                <Ionicons name="arrow-back" size={24} color="white" />
              
                
                </TouchableOpacity>
                <Text style= {{fontWeight:'bold', color:'white'}}>{route.params.titleName}</Text>
                <Ionicons name="arrow-back" size={24} color="transparent"  />
       
          </View>
     

    </View>
  )
}

// 리턴에 관련된 함수들

// const navigateToDetails = () => {
//   navigation.navigate('Detail');
// };



// const titleFontSize = (item) =>{
//   if (item == 1) {
//     return {fontSize : 15}
//   } else {
//     return {fontSize : 11}
//   }
// }



export default BoardTitleScreen