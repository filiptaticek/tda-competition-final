import { IDiaryEntry, ITag, IUser } from "../../types"
import { AnyAction } from "redux"
import { Page } from "../reducers/page_reducer"

//RECORDS ACTIONS

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

//SIDEBAR ACTIONS

export const toggleSidebarVisbility = (): AnyAction => {
  return {
    type: "TOGGLE_VISIBILITY"
  }
}

//USERS ACTIONS

export const setUsers = (users:Array<IUser>): AnyAction => {
  return {
    type: "SET_USERS",
    users:users
  }
}

export const addSingleUser = (newuser:IUser): AnyAction =>{
  return {
    type: "ADD_USER",
    newuser:newuser
  }
}

export const removeSingleUser = (deleteduser_id:number): AnyAction => {
  return {
    type: "REMOVE_USER",
    deleteduser_id:deleteduser_id
  }
}

export const updateSingleUser = (updated_user_id:number,newrecord:IUser): AnyAction => {
  return {
    type: "UPDATE_USER",
    updated_user_id:updated_user_id,
    newrecord:newrecord
  }
}

//TAGS ACTIONS

export const setTags = (tags:Array<ITag>): AnyAction => {
  return {
    type: "SET_TAGS",
    tags:tags
  }
}

export const addSingleTag = (newtag:ITag): AnyAction =>{
  return {
    type: "ADD_TAG",
    newtag:newtag
  }
}

export const removeSingleTag = (deleted_tag_id:number): AnyAction => {
  return {
    type: "REMOVE_TAG",
    deleted_tag_id:deleted_tag_id
  }
}

export const updateSingleTag = (updated_tag_id:number,new_tag:ITag): AnyAction => {
  return {
    type: "UPDATE_TAG",
    updated_tag_id:updated_tag_id,
    new_tag:new_tag
  }
}

//PAGE ACTIONS
export const setPage = (page:Page): AnyAction => {
  return {
    type: "SET_PAGE",
    page:page
  }
}

//MODE ACTIONS
export const toggleMode = (): AnyAction => {
  return {
    type: "TOGGLE_DARK_MODE"
  }
}