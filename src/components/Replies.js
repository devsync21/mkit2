import React from 'react'
import { useState,useEffect, useContext } from 'react'

import { StyleSheet, Text, View, Button, FlatList,SafeAreaView, TouchableOpacity } from 'react-native';
// import axios from "axios";
import instance from '../api/Api';

import ThemeContext from '../store/ThemeContext';
import ConfigContext from '../store/ConfigContext';



const Replies =  ({route}) => {

  const [detailReply, setDetailReply] = useState([])
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
                  <Text style = {{fontSize:configValue.RcommonFontSize, marginLeft:0, 
					color: themeValue.Reply.RsmFontColr}}>
						{item.item.ip_address}</Text>   
                  <Text style = {{fontSize:configValue.RcommonFontSize, marginRight:5, 
					color: themeValue.Reply.RsmFontColr}}>
						{newdatetime}</Text>  
            </View>
            <View>
                   <Text style = {{fontSize:configValue.RfontSize,
				color: themeValue.Reply.RfontColor}}>{htmlDetail(item.item.rep_detail)}</Text> 
            </View>
       </View>    

      )

  }  


  const ReplyItem = (item) =>{
  
     
        return (
            <TouchableOpacity
            // onPress={this.itemClick(item)}
            // onPress =  () =>  console.log('dd')
            
       		>
				<View style = {{   
					borderTopWidth : 1,
					paddingRight: 15,
					borderTopColor: themeValue.Reply.RborderColor}}>
				
					{ item.item.rep_rep_icon === 0 ?   
						// 대댓글
						<View style={{paddingLeft : 30, paddingTop:20, paddingBottom:20}}> 
			
							{ item.item.if_deleted.length === 0 ?
								<ReplyCommonItem item = {item.item}/>
								:
								<View>
									<Text style = {{color: themeValue.Reply.RdeletedFontColor}}> {item.item.if_deleted} </Text>
								</View>
							}
							
						
						</View> :


						//  댓글 
						<View style={{paddingLeft : 10, paddingTop:20, paddingBottom:20}}> 
						
					
							{ item.item.if_deleted.length === 0 ?
								<ReplyCommonItem item = {item.item}/>
								:
								<View>
										<Text style = {{color:themeValue.Reply.RdeletedFontColor}}> {item.item.if_deleted} </Text>
								</View>

							}

						</View>


					}
				</View>
            </TouchableOpacity>
        )
    
  } 

// 메일 return
  return (
   
    <View  style = {{
		flex:1,
		backgroundColor: themeValue.Reply.RbackgroundColor
	}}>
		<Text style = {{
			color: themeValue.Reply.RnumfontColor
		}}>댓글 {detailReply.length}</Text>


        { detailReply && detailReply.length > 0 ? detailReply.map((item, id) => {
         
            return (<ReplyItem item={item} key={id}/>)
        }) : ""}
   
      </View>

  )
}
// 스타일에 관련된 함수들


export default Replies