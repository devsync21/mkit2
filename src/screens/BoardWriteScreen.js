import React from 'react'
import { useEffect,useState, useContext } from 'react'

import { StyleSheet, Text, View, TextInput, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';



const BoardWriteScreen = ({route,navigation}) => {
	// console.log("sss",navigation)
    const [title, setTitle] = useState("")

    const [content, setContent] = useState("")
    
    const [links, setLinks] = useState("http://")

    // console.log(route.params.titleName)

    const ImagePicker = () => {
        return (
            <View style ={{marginTop:15}}>
                <View style ={{ flexDirection:'row',}}>
                    <View style={{width: '30%', paddingLeft:10}}>
                        <TouchableOpacity>
                            <View
                            style = {{
                                
                                
                                height: 40,
                                padding:10,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor: 'lightblue'
                            }}>
                            <Text>사진첨부 +</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:"70%", alignItems:'flex-start',
                                justifyContent:'center',
                                paddingLeft:20}}>
                        <Text> 파일 이름이 여기에</Text>
                    </View>
                </View>
            </View>

        )
    }
    const Labels = ({labelText}) => {
        return (
            <Text style={{
                marginHorizontal:10,
                fontSize:14,
                marginTop: 15,
                marginBottom:5
            }}> {labelText}</Text>
        )
    }

    const onPressCancel = () => {
        navigation.goBack()
    }

    const HeadInfo = ({title}) => {
        return (
            <View style = {{ height:50, backgroundColor: "green", flexDirection:'row',
                justifyContent:'space-between', alignItems:'center',
                paddingHorizontal:10
            }}>
                <View>
                    <TouchableOpacity onPress={onPressCancel}>
                    <Text> 취소</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{title}</Text>
                </View>
                <View>
                    <Text> 저장 </Text>
                </View>

                
            </View>
        )
    }
    


    // 메인 함수의 리턴
  return (

  <View>
    <HeadInfo title = {route.params.titleName}/>
    <Labels labelText = {'제목'} />
   

    <TextInput

        style ={{ 
            borderWidth:1, 
            borderColor:'lightblue',
            marginHorizontal:10,
            borderRadius:5,
            height:50,
       
            padding:10


        }}
        onChangeText={(text) => setTitle(text)}
        value={title}
        placeholder=' 제목을 입력하세요.'
        />

    <Labels labelText = {'내용'} />
    <TextInput

        style ={{ 
            borderWidth:1, 
            borderColor:'lightblue',
            marginHorizontal:10,
            borderRadius:5,
            height:200,
      
            textAlignVertical: 'top',
            padding:10


         }}


        multiline={true}

        onChangeText={(text) => setContent(text)}
        value={content}
        placeholder=' 내용을 입력하세요.'
        
        />

    <Labels labelText = {'관련링크'} />

    <TextInput

        style ={{ 
            borderWidth:1, 
            borderColor:'lightblue',
            marginHorizontal:10,
            borderRadius:5,
            height:50,

            padding:10
        }}
        onChangeText={(e) => setLinks(e)}
       
        value={links}
        defaultValue = {links}
        />

        <ImagePicker/>
        <ImagePicker/>
        <ImagePicker/>

       
  </View>

  )
}

export default BoardWriteScreen