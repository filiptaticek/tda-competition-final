import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry, ITag, IUser } from "../../types"

export const putRequest = async (path:string,id: number, data: IDiaryEntry|IUser|ITag)=> {
  try {
    const response = await axios.put(`${baseUrl}/${path}/${id}`, data)
    return(response.data)
  } catch (error) {
    console.error(error)
  }
}