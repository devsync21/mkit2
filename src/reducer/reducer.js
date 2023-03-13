

const reducer = (state, action) => {
    switch(action.type) {
      case 'CHANGE_THEME':
        // console.log(action.value)
        state = action.value
        return state
      default:
        return state
    }
  }


  export default reducer;