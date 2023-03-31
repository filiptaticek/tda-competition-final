import { ISticknote } from "../../types"

export const notesReducer = (state: ISticknote[] = [], action: any) => {
  switch (action.type) {
  case "SET_NOTES": {
    return action.notes ? action.notes : []
  }
  case "ADD_NOTE": {
    return [action.newnote, ...state]
  }
  /*
  case "REMOVE_USER": {
    return state.filter((user: IUser) => user.id !== action.deleteduser_id)
  }
  case "UPDATE_USER": {
    return state.map((record: IUser) => (record.id !== action.updated_user_id ? record : action.newrecord))
  }*/
  default:
    return state
  }
}
