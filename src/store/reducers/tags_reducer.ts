import { ITag } from "../../types"

export const tagsReducer = (state:ITag[]=[], action:any) => {
  switch (action.type) {
  case "SET_TAGS":{
    return (action.tags?action.tags:[])
  }
  case "ADD_TAG":{
    return ([action.newtag,...state])
  }
  case "REMOVE_TAG":{
    return(state.filter((tag:ITag) => tag.id !== action.deleted_tag_id))
  }
  case "UPDATE_TAG":{
    return(state.map((record:ITag) => record.id !== action.updated_tag_id ? record : action.new_tag))
  }
  default:
    return state
  }
}
  