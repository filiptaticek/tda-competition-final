import axios from "axios"
import { baseUrl } from "../../constants"

export const deleteRequest = async (path:string,id: number)=> {
  try {
    const response = await axios.delete(`${baseUrl}/${path}/${id}`)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}