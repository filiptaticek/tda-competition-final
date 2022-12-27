export const recordsReducer = (state = [], action:any) => {
  switch (action.type) {
  case "SET_RECORDS":{
    return (action.records)
  }
  case "ADD_RECORD":{
    return ([action.newrecord,...state])
  }
  default:
    return state
  }
}

  