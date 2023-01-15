import axios from "axios"
import { baseUrl } from "../../constants"

export const getRequest = async (path:string) => {
  try {
    const response = await axios.get(`${baseUrl}/${path}`)
    return(response.data)
  } catch (error) {
    console.error(error)
  }
}