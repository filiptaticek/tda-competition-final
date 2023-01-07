import { IDiaryEntry } from "../../types"

export const recordsReducer = (state:IDiaryEntry[] = [], action:any) => {
  switch (action.type) {
  case "SET_RECORDS":{
    return (action.records)
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
    return(state.sort((a, b) => new Date(a.datetime).toISOString().localeCompare(new Date(b.datetime).toISOString())))
  }
  case "SORT_RECORDS_FROM_NEWEST":{
    return(state.sort((a, b) => new Date(b.datetime).toISOString().localeCompare(new Date(a.datetime).toISOString())))
  }
  case "SORT_RECORDS_FROM_LOWEST_RATING":{
    return(state.sort((a, b) => a.rating - b.rating))
  }
  case "SORT_RECORDS_FROM_HIGHEST_RATING":{
    return(state.sort((a, b) => b.rating - a.rating))
  }
  case "SORT_RECORDS_FROM_SHORTEST":{
    return(state.sort((a, b) => a.minutes_spent - b.minutes_spent))
  }
  case "SORT_RECORDS_FROM_LONGEST":{
    return(state.sort((a, b) => b.minutes_spent - a.minutes_spent))
  }
  default:
    return state
  }
}

  