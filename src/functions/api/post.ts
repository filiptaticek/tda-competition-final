import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry, ITag, IUser } from "../../types"

export const postRequest = async (data: IDiaryEntry|IUser|ITag,path:string,token:string) => {

  const headers = {
    "x-access-token": token
  }

  try {
    const response = await axios.post(`${baseUrl}/${path}`, data, {headers} )
    return(response.data)
  } catch (error) {
    console.error("Ajaj: ",error)
  }
}