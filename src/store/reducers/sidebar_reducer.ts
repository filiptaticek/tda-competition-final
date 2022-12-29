export const sidebarReducer = (state = false, action:any) => {
  switch (action.type) {
  case "TOGGLE_VISIBILITY":{
    return (!state)
  }
  default:
    return state
  }
}
