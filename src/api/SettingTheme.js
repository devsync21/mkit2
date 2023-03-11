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
        style : {
            fontSize : 15
        }
    },
]

// theme 에는 들어가지 않는 내용들
const SettingConfig = {
    // T: Title /  D: Detail / R:Reply 
    TTfontSize : 15,

} 


const SettingTheme = (themeValue) => {
   

    const theme = SettingThemeAll.find(x => x.themeId === themeValue)

    return theme

}

export  {SettingTheme, SettingConfig};