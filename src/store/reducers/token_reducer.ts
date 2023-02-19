
export const tokenReducer = (state:string|null=null, action:any) => {
  switch (action.type) {
  case "SET_TOKEN":{
    return (action.newtoken)
  }
  default:
    return state
  }
}