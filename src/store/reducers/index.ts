import { combineReducers } from "redux"
import { recordsReducer } from "./records_reducer"

export default combineReducers({
  records: recordsReducer,
})