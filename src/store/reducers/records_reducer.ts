import { IDiaryEntry } from "../../types"

export const recordsReducer = (state = [], action:any) => {
  switch (action.type) {
  case "SET_RECORDS":{
    return (action.records)
  }
  case "ADD_RECORD":{
    return ([action.newrecord,...state])
  }
  case "REMOVE_RECORD":{
    return(state.filter((record:IDiaryEntry) => record.record_id !== action.deletedrecord_id))
  }
  case "UPDATE_RECORD":{
    return(state.map((record:IDiaryEntry) => record.record_id !== action.updatedrecord_id ? record : action.newrecord))
  }
  default:
    return state
  }
}

  