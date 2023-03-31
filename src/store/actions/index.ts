import { AnyAction } from "redux"

import { ISticknote, IUser } from "../../types"

export const setNotes = (notes: Array<ISticknote>): AnyAction => {
  return {
    type: "SET_NOTES",
    notes: notes
  }
}

export const addSingleNote = (newnote: ISticknote): AnyAction => {
  return {
    type: "ADD_NOTE",
    newnote: newnote
  }
}

export const removeSingleUser = (deleteduser_id: number): AnyAction => {
  return {
    type: "REMOVE_USER",
    deleteduser_id: deleteduser_id
  }
}

export const updateSingleUser = (updated_user_id: number, newrecord: IUser): AnyAction => {
  return {
    type: "UPDATE_USER",
    updated_user_id: updated_user_id,
    newrecord: newrecord
  }
}

export const toggleMode = (): AnyAction => {
  return {
    type: "TOGGLE_DARK_MODE"
  }
}
