import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry, ITag, IUser } from "../../types"

export const postRequest = async (data: IDiaryEntry|IUser|ITag|any,path:string,token:string,typefile?:boolean) => {

  const headers = {
    "x-access-token": token,
    ...(typefile ? { "Content-Type": "multipart/form-data" } : {})
  }

  const response = await axios.post(`${baseUrl}/${path}`, data, {headers} )
  return(response.data)
}