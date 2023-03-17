import React, { useContext, useState, useRef, useEffect} from 'react'
import {Text, View, Button, 
        TouchableOpacity,
        Animated, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';



const BottomMenuTitle = ({navigation, route, pressSearch,searchText,setSearchText,sectioninfo } ) => {
    const {themeValue, tdispatch} = useContext(ThemeContext)
    const {configValue} = useContext(ConfigContext)


    const goBack = () => {
  
        navigation.toggleDrawer();
        
    }
    



    // animation 관련 함수 시작

    const [toggled, setToggled] = useState(false);
    const height = useRef(new Animated.Value(0)).current;
    // const [searchText, setSearchText] = useState("")
  
    useEffect(() => {
        Animated.timing(height, {
            toValue: toggled ? 1 : 0,
            duration: 120,
            useNativeDriver: false,
        }).start();
    }, [toggled]);
  
    const ExtraMenu = height.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 55],
    });
    
    // 제일 아래 버튼 눌를때 검색 관련 팝업 나왔다 사라지게...
    const btnSearch = () => {
        setToggled((prev) => !prev)
   
    }
    // animation 관련 함수 끝

    //직접 검색어 입력후 검색 버튼 누르기
    const onPressSearch = () => {
 
        // 여기에 검색 함수 적기
        console.log("sear", searchText)
        pressSearch()
        setSearchText("")
    }
    
    const btnWriting = () => {
        console.log(' 글 작성하기')
    }
  

    return (
        <View style = {{  
            flexDirection:'column',
            justifyContent:'flex-end'
        
            }}>
            {
                // searchToggle && 
                <Animated.View 
                    
                    style={{
                        height:ExtraMenu,
                        backgroundColor: themeValue.Title.TbottomMenuBackgroundColor,
                    
                    }}>
                    <View
                        style={{
                            height:'100%',
                            borderWidth:1,
                            borderBottomColor:'darkgrey',
                            flexDirection:'row'

                        }}>
                            <TextInput
                            style={{  
                                height: 30,
                                marginVertical: 10,
                                marginLeft:20,
                                width:'70%',
                                borderWidth: 1,
                                borderColor:'black',
                                borderRadius:5,
                                padding: 5,
                                color:'darkblue',
                                backgroundColor:"white"
                            }}
                                
                                onChangeText={newText => setSearchText(newText)}
                                value={searchText}
                                placeholder = '검색어를 입력하세요'
                            
                        />
                        <TouchableOpacity 
                        style={{
                            width : '20%',
                            marginRight:30,
                        }}
                        onPress={() => onPressSearch()}>
                            <View 
                                style ={{
                                    height:30,
                                    marginVertical:10,                                    
                                    marginLeft: '10%',                                    
                                    backgroundColor:'skyblue',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:5,
                                }}
                            >
                                <Text
                                style ={{
                                    fontSize:15,
                                    lineHeight:25,
                                    fontWeight:800
                                }}> 검색</Text>
                            </View>

                        </TouchableOpacity>
                        
                    </View>
                </Animated.View>
            }   

            <View 
                style={{
                    width: "100%",
                    height: "100%",
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

                <MaterialIcons name="edit" size={24} color="transparent" />
            
                <Text style= {{fontWeight:'bold', color:themeValue.Title.TBottomMenufontColor}}>
                    {sectioninfo.sectionname}
                </Text>

            
                <TouchableOpacity onPress={btnSearch}>
                    <MaterialIcons name="search" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
                </TouchableOpacity>

                <TouchableOpacity onPress={btnWriting}>
                    <MaterialIcons name="edit" size={24} style={{color: themeValue.Title.TBottomMenufontColor}} />
                </TouchableOpacity>
            </View>
                 
        </View>
  )
}

export default BottomMenuTitle