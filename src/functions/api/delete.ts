import axios from "axios"
import { baseUrl } from "../../constants"

export const deleteRequest = async (id: number)=> {
  try {
    const response = await axios.delete(`${baseUrl}/record/${id}`)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}