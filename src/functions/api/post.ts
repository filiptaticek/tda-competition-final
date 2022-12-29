import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry } from "../../types"

export const postRequest = async (data: IDiaryEntry) => {
  try {
    const response = await axios.post(`${baseUrl}/record`, data)
    return(response.data)
  } catch (error) {
    console.error(error)
    return("whatever")
  }
}