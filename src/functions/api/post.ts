import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry, ITag, IUser } from "../../types"

export const postRequest = async (data: IDiaryEntry|IUser|ITag,path:string) => {
  try {
    const response = await axios.post(`${baseUrl}/${path}`, data)
    return(response.data)
  } catch (error) {
    console.error(error)
    return("whatever")
  }
}