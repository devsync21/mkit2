

const fontReducer = (state, action) => {
    switch(action.type) {
      case 'CHANGE_FONT':

        ffontSize = action.value

        	const ff = {
			// T: Title /  D: Drawer / R:Reply / C:Content
            TTfontSize : ffontSize,  // 타이틀 제목 글자 크기
            CfontSize :ffontSize,     // 콘텐트 글자 크기
            ClineHeight: ffontSize+5 ,     //콘텐트 라인 크기
            RfontSize:ffontSize,        //댓글 글자 크기
            RcommonFontSize: ffontSize-4    // 댓글 아이피/시간 글자 크기
          } 

        return ff
      default:
        return state
    }
  }


  export default fontReducer;