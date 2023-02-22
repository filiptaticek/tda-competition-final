import { IDiaryEntry } from "../../types"

export const recordsReducer = (state:IDiaryEntry[] = [], action:any) => {
  switch (action.type) {
  case "SET_RECORDS":{
    return (action.records?action.records:[])
  }
  case "ADD_RECORD":{
    return ([action.newrecord,...state])
  }
  case "REMOVE_RECORD":{
    return(state.filter((record:IDiaryEntry) => record.id !== action.deletedrecord_id))
  }
  case "UPDATE_RECORD":{
    return(state.map((record:IDiaryEntry) => record.id !== action.updatedrecord_id ? record : action.newrecord))
  }
  case "SORT_RECORDS_FROM_OLDEST":{
    return(state.sort((a, b) => new Date(a.date).toISOString().localeCompare(new Date(b.date).toISOString())))
  }
  case "SORT_RECORDS_FROM_NEWEST":{
    return(state.sort((a, b) => new Date(b.date).toISOString().localeCompare(new Date(a.date).toISOString())))
  }
  case "SORT_RECORDS_FROM_LOWEST_RATING":{
    return(state.sort((a, b) => a.rating - b.rating))
  }
  case "SORT_RECORDS_FROM_HIGHEST_RATING":{
    return(state.sort((a, b) => b.rating - a.rating))
  }
  case "SORT_RECORDS_FROM_SHORTEST":{
    return(state.sort((a, b) => a.time_spent - b.time_spent))
  }
  case "SORT_RECORDS_FROM_LONGEST":{
    return(state.sort((a, b) => b.time_spent - a.time_spent))
  }
  default:
    return state
  }
}

  