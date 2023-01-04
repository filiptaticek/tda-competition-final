import { IUser } from "../../types"

export const usersReducer = (state:IUser[]=[], action:any) => {
  switch (action.type) {
  case "SET_USERS":{
    return (action.users)
  }
  case "ADD_USER":{
    return ([action.newuser,...state])
  }
  case "REMOVE_USER":{
    return(state.filter((user:IUser) => user.programmer_id !== action.deleteduser_id))
  }
  default:
    return state
  }
}
  