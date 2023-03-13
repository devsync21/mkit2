// theme setting에 들어가는 내용들

const SettingThemeAll = [
    // 1: light default theme
    // 8: dark default theme
    {    
        themeId : 1,
        Title : {
            TfontColor: 'black',     // 타이틀 제목 글자 색
            TbackgroundColor :'white',    // 타이틀 제목 배경 색
            TborderColor : "#ddd", // 타이틀 제목 경계선 색

            TreplBackgroundColor : 'orange' // 타이틀 제목에 댓글수 배경색
        }
    },

    {    
        themeId : 8,    
        Title : {
            TfontColor: '#ffffff',     // 타이틀 제목 글자 색
            TbackgroundColor :'#192734',    // 타이틀 제목 배경 색
            TborderColor : "#b3b3b3", // 타이틀 제목 경계선 색
            TsmFontColor: '#b0b3b8',   //타이틀 작은 제목 (시간/아이피)

            TreplBackgroundColor : '#b3b3b3', // 타이틀 제목에 댓글수 배경색
            TreplfontColor: '#ffffff'   // 타이틀 제목에 댓글수 글자색
        },

        Drawer : {
            DbackgroundColor: "#18191a",  // 전체 배경색
            // DbackgroundColor: "yellow",  // 전체 배경색
            DinactiveTintColor: "white",  // 선택 안된 메뉴 글자색

            
            DfixedMenuFontColor : '#ffffff', // 고정 제목 메뉴 글자 색
            DfixedMenuBackgroundColor: '#3a3b3c', // 고정 제목 메뉴 바탕색

            DmenuBackgroundColor : '#3a3b3c',

            DborderColor: '#ffffff'   //아래 메뉴쪽 경계선

        },

        Content : {
            CbackgroundColor: '#192734', //전체 배경색
            CfontColor: "white"
        },

        Reply : {
            RbackgroundColor: '#192734',     // 전체 배경색
            RborderColor : 'darkgrey',    // 댓글 경계선 색

            RnumfontColor : 'white',   //댓글 수자 나타내는 글자 색

            RfontColor:"white",       // 댓글 글자 색
            RsmFontColr: 'grey',     // 댓글 시간/아이피 글자 색
            RdeletedFontColor: 'grey'   // 삭제된 댓글 색

        }
    },
]

// theme 에는 들어가지 않는 내용들
const SettingConfig = {
    // T: Title /  D: Drawer / R:Reply / C:Content
    TTfontSize : 15,  // 타이틀 제목 글자 크기
    CfontSize :15,     // 콘텐트 글자 크기
    ClineHeight: 20,     //콘텐트 라인 크기
    RfontSize:15,        //댓글 글자 크기
    RcommonFontSize: 11    // 댓글 아이피/시간 글자 크기



} 


const SettingTheme = (themeValue) => {
   

    const theme = SettingThemeAll.find(x => x.themeId === themeValue)

    return theme

}

export  {SettingTheme, SettingConfig};