import React from 'react'
import { useState,useEffect, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
// import axios from "axios";
import instance from '../api/Api';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SwipeRow } from 'react-native-swipe-list-view';

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';
import { TextInput } from 'react-native-gesture-handler';



const Replies =  ({route}) => {

  const [detailReply, setDetailReply] = useState([])
  // 답글달기 버튼 누르면 나오는 내용 정하기
  const [commentSelected, setCommentSelected] =useState(0)
  const [replContent,setReplContent] = useState('')
  const info = route.params  

  // const baseUrl = 'http://localhost:3000';

  
  	const {themeValue, tdispatch} = useContext(ThemeContext)
	const {configValue} = useContext(ConfigContext)

   

  const getDetailReplyAxios = async () => {

    let replink1 = info.data1.link
    let replink2 = replink1.split("&")


    const newlink = 'http://m.missyusa.com/mainpage/boards/board_reply_list.asp?id='
                      + info.data2.sectionid + '&'+ replink2[6] + '&' + replink2[7] + '&step=1'


    const url = "/get_board_detail_replies"

    try {
      
      let res = await instance.post(url,
          data={
            link : newlink
          }
          )   
          setDetailReply(res.data)    
      
  
    } catch(e){
     
      console.log(e)
  
    }
 
    }

    useEffect(() => {
        getDetailReplyAxios()
    },[]);  



  const ReplyCommonItem = (item) => {
		
      const htmlDetail = (word) => {

	
        if (word && word.length>0){
            return word.replace(/<br ?\/?>/ig,"\n")
        } else {
            ""
        }
      
      }

      const datetime = item.item.time.split(' ')
      const time =  datetime[2].slice(0,4)
      const newdatetime = datetime[0]+' '+ time + datetime[1]
      // console.log (newdatetime)



      return (  
        <View >
            <View style = {{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
                  {/* <Text >{item.item.rep_no}</Text>  */}
				<View style = {{flexDirection:'row'}}>

				{/*만일 대댓글인 경우 아래 화살표 표시 나오게 함  */}
				  { item.item.rep_rep_icon === 0 ? 
						<MaterialCommunityIcons name="arrow-right-bottom" style={{
							color : themeValue.Reply.RsmFontColr,
							fontSize: configValue.RcommonFontSize,
							marginRight:5
						}} /> : <Text></Text>
					}

                  <Text style = {{fontSize:configValue.RcommonFontSize, marginLeft:0, 
					color: themeValue.Reply.RsmFontColr}}>
						
						{item.item.ip_address}</Text>   
						</View>
                  <Text style = {{fontSize:configValue.RcommonFontSize, marginRight:5, 
					color: themeValue.Reply.RsmFontColr}}>
						{newdatetime}</Text>  
            </View>
			{/* 진짜 댓글 내용 */}
            <View>
                   <Text style = {{fontSize:configValue.RfontSize,
				color: themeValue.Reply.RfontColor}}>{htmlDetail(item.item.rep_detail)}</Text> 
            </View>
       </View>    

      )

  }  

  const ReplyEditor = () =>{

	const onChangeReplContent =(txt) => {
		
		console.log(txt)
	}
	return (
		<View style = {{
			borderWidth:1,
			borderTopColor:'white',
			paddingHorizontal:10,
			paddingVertical:5,
			backgroundColor: 'skyblue'
		}}>
			<Text>haha</Text>
			<TextInput
				multiline={true}

				onChangeText={(text) => onChangeReplContent(text)}
				value={replContent}
				placeholder=' 댓글을 입력하세요.'

				style ={{
					width :'100%',
					height: 80,
					borderWidth:1,
					borderColor:'green',
					borderRadius:5,
					backgroundColor: 'lightyellow'
				}}
			/>
			<View style={{flexDirection:'row', 
				justifyContent:'flex-end',
				marginTop:3
				}}>
				<TouchableOpacity>
					<View style={{
						backgroundColor:'orange',
						paddingVertical:5,
						paddingHorizontal:15,
						marginRight:20,
						borderRadius: 5

					}}>
						<Text> 취소</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={{
						backgroundColor:'lightgreen',
						paddingVertical:5,
						paddingHorizontal:15,
						borderRadius: 5

					}}>
						<Text> 답글달기</Text>
					</View>
				</TouchableOpacity>
				
			</View>
		</View>
	)
  }

  const BackOfSwipe = (item) => {
	const onPressReply = () => {
		// console.log(item.item.rep_no)
		setCommentSelected(item.item.rep_no)
	} 

	return(
		<View style ={{
			flexDirection:'row', 
			justifyContent:'flex-end',
			alignItems: 'center',
			backgroundColor: '#8BC645',				
			flex: 1,
			// padding: 15,
			}}>
            
            <TouchableWithoutFeedback >

				<View  style ={{
					flexDirection:'row', 
					justifyContent:'center',
					alignItems: 'center',
					backgroundColor: 'orange',				
					width:60,
					height:'100%'
					
					// padding: 15,
					}}>
					
						<Text style={{
							color: 'black'
						}}>2222</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={onPressReply}>
			
				<View  style ={{
					flexDirection:'row', 
					justifyContent:'center',
					alignItems: 'center',
					backgroundColor: 'lightblue',				
					width:60,
					height:'100%'
					
					// padding: 15,
					}}>
					
						<Text style={{
							color: 'black'
						}}>답글</Text>
				</View>	
			</TouchableWithoutFeedback>

		</View>
	)
  }

  const ReplyItem = (item) =>{
  
     
        return (
            <TouchableWithoutFeedback>
				<View style = {{   
					borderTopWidth : 1,
					// paddingRight: 15,
					borderTopColor: themeValue.Reply.RborderColor}}>
				
					{ item.item.rep_rep_icon === 0 ?   

						// 대댓글 시작
						<View style={{ paddingLeft:30, paddingTop:10, paddingBottom:20, paddingRight: 15,
						flexDirection:'row'

						}}> 
							
							<View>
								{ item.item.if_deleted.length === 0 ?
									// 삭제된 글이 아닌ㄹ 경우
									<ReplyCommonItem item = {item.item} />
									:
									// 삭제된 글일 경우
									<View>
										<Text style = {{color: themeValue.Reply.RdeletedFontColor}}> {item.item.if_deleted} </Text>
									</View>
								}

							</View>
						</View> :
						// 대댓글 끝

						//  댓글   

						<View 
						// style={{paddingLeft : 10}}
						> 				
							{ item.item.if_deleted.length === 0 ?


								 // 스와이프 하면 댓글 옵션 나옴			
								<View>			
								    <SwipeRow rightOpenValue={-120}>							
										<BackOfSwipe item = {item.item}/>
										<View>
											<View style = {{									
												backgroundColor:  themeValue.Reply.RbackgroundColor,										
												paddingTop:10, paddingBottom:20, paddingRight: 10,
												paddingLeft:10					
												}}>
												<ReplyCommonItem item = {item.item} />
											</View>
											{ item.item.rep_no == commentSelected ?
											<View style={{backgroundColor:  themeValue.Reply.RbackgroundColor}}>
												<ReplyEditor/>
											</View>
											: <View></View>
  											}
										</View>
									</SwipeRow>
								</View>
								:
								// 삭제된 글 나타냄

								<View>
										<Text style = {{color:themeValue.Reply.RdeletedFontColor}}> {item.item.if_deleted} </Text>
								</View>
							}
						</View>


					}
				</View>
            </TouchableWithoutFeedback >
        )
    
  } 

// 메인 return
  return (
   
    <View  style = {{
        flex:1,
        backgroundColor: themeValue.Reply.RbackgroundColor,
		
     		 }}>
		<Text style = {{
			color: themeValue.Reply.RnumfontColor,
			marginLeft:10,
			marginBottom:3
			
			}}>댓글 {detailReply.length}</Text>


			{ detailReply && detailReply.length > 0 ? detailReply.map((item, id) => {
			
				return (<ReplyItem item={item} key={id}/>)
			}) : ""}
   
      </View>

  )
}
// 스타일에 관련된 함수들


export default Replies