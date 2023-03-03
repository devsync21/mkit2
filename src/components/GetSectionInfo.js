import React from 'react'

const GetSectionInfo = (item) => {
    let sectioninfo ={}
    // console.log(item)
  switch (item.params.category) {
    case 1:
      sectioninfo = {section : 'talk', sectionid : 'talk1', sectionname : "생활 Q&A"}
      break;
    case 2:
      sectioninfo = {section : 'talk', sectionid : 'talk6', sectionname : "연예"}
      break;
    case 3:
      sectioninfo = {section : 1, sectionid : 13}
      break;
    default :
      sectioninfo = {section : 1, sectionid : 1}
  }
  return sectioninfo
}

export default GetSectionInfo