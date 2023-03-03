
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList,SafeAreaView } from 'react-native';

const a = [{
    id :1,
    name: "hi"
},
{
    id :2,
    name: "hi"
},
{
    id :3,
    name: "hi"
}]

const b =[
    {
    id :3,
    name: "hi"
},
{
    id :4,
    name: "hi"
},
{
    id :5,
    name: "hi"
}
]
const test = () => {

  const [dataT,setDataT] = useState(a)  

  const renderItem = ({item}) =>{
    return(
        <View>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        </View>

    )
  }

  const buttonpress =()=>{
    console.log("pressed")





    // setDataT([...dataT,...b])
    let re1= dataT
    console.log(re1)
    re1 = [...re1,...b]
    setDataT(re1)
    console.log('222222222',re1)
    console.log('UUUUUUUUUUUUUUUUUUU',dataT)



    //test
    var result = re1.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id )) {
          unique.push(o);
        }
        return unique;
    },[]);

    //test
    console.log(result)
  }
    
  return (
    <View>
    <Text>test</Text>
    <Button  onPress={buttonpress} title="buttton"></Button>
    <FlatList
         data={dataT}
         renderItem={renderItem}
         keyExtractor={item => item.id}
    >

    </FlatList>
    </View>
  )
}

export default test