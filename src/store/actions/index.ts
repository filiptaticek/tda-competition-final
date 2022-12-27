import { IDiaryEntry } from "../../types"
import { AnyAction } from "redux"

export const setRecords = (records:Array<IDiaryEntry>): AnyAction => {
  return {
    type: "SET_RECORDS",
    records:records
  }
}

export const addSingleRecord = (newrecord:IDiaryEntry): AnyAction => {
  return {
    type: "ADD_RECORD",
    newrecord:newrecord
  }
}