import { IUser } from "../../types"

export const usersReducer = (state:IUser[]=[], action:any) => {
  switch (action.type) {
  case "SET_USERS":{
    return (action.users)
  }
  default:
    return state
  }
}
  