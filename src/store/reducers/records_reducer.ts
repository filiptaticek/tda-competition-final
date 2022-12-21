export const recordsReducer = (state = [], action:any) => {
  switch (action.type) {
  case "SET_RECORDS":{
    return (action.data.records)
  }
  default:
    return state
  }
}

  