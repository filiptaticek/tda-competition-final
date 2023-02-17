import { IUser } from "../../types"

export const userReducer = (state:IUser|null=null, action:any) => {
  switch (action.type) {
  case "SET_USER":{
    return (action.newuser)
  }
  default:
    return state
  }
}