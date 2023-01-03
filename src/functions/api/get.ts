import axios from "axios"
import { baseUrl } from "../../constants"

export const getRequest = async () => {
  try {
    const response = await axios.get(`${baseUrl}/record`)
    return(response.data)
  } catch (error) {
    //console.error(error)
  }
}