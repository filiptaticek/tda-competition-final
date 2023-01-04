import { IDiaryEntry, IUser } from "../../types"
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

export const removeSingleRecord = (deletedrecord_id:number): AnyAction => {
  return {
    type: "REMOVE_RECORD",
    deletedrecord_id:deletedrecord_id
  }
}

export const updateSingleRecord = (updatedrecord_id:number,newrecord:IDiaryEntry): AnyAction => {
  return {
    type: "UPDATE_RECORD",
    updatedrecord_id:updatedrecord_id,
    newrecord:newrecord
  }
}

export const toggleSidebarVisbility = (): AnyAction => {
  return {
    type: "TOGGLE_VISIBILITY"
  }
}

export const sortEntriesFromOldest = (): AnyAction => {
  return {
    type: "SORT_RECORDS_FROM_OLDEST"
  }
}

export const sortEntriesFromNewest = (): AnyAction => {
  return {
    type: "SORT_RECORDS_FROM_NEWEST"
  }
}

export const sortEntriesFromLowestRating = (): AnyAction => {
  return {
    type: "SORT_RECORDS_FROM_LOWEST_RATING"
  }
}

export const sortEntriesFromHighestRating = (): AnyAction => {
  return {
    type: "SORT_RECORDS_FROM_HIGHEST_RATING"
  }
}

export const sortEntriesFromShortest = (): AnyAction => {
  return {
    type: "SORT_RECORDS_FROM_SHORTEST"
  }
}

export const sortEntriesFromLongest = (): AnyAction => {
  return {
    type: "SORT_RECORDS_FROM_LONGEST"
  }
}

export const setUsers = (users:Array<IUser>): AnyAction => {
  return {
    type: "SET_USERS",
    users:users
  }
}