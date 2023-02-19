import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry, ITag, IUser } from "../../types"

export const putRequest = async (path:string,id: number, data: IDiaryEntry|IUser|ITag, token:string)=> {
  
  const headers = {
    "x-access-token": token
  }

  try {
    const response = await axios.put(`${baseUrl}/${path}/${id}`, data, {headers})
    return(response.data)
  } catch (error) {
    console.error(error)
  }
}