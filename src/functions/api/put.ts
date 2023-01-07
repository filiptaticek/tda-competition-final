import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry, IUser } from "../../types"

export const putRequest = async (path:string,id: number, data: IDiaryEntry|IUser)=> {
  try {
    await axios.put(`${baseUrl}/${path}/${id}`, data)
  } catch (error) {
    console.error(error)
  }
}