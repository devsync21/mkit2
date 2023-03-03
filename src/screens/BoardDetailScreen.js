import React, { useEffect,useState } from 'react'
import { ScrollView  } from 'react-native';


import Replies from '../components/Replies';

import DetailContent from '../components/DetailContent';


var iconv = require('iconv-lite');
const cheerio = require('cheerio')




const DetailScreen = ({route}) => {

  return (
    <>

      <ScrollView >
      
          <DetailContent route ={route} />
      
          <Replies route = {route}/>

      </ScrollView> 

    </>
  )
}


export default DetailScreen