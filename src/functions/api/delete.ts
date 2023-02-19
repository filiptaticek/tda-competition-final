import axios from "axios"
import { baseUrl } from "../../constants"

export const deleteRequest = async (path:string,id: number, token:string)=> {

  const headers = {
    "x-access-token": token
  }

  try {
    const response = await axios.delete(`${baseUrl}/${path}/${id}`,{headers})
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}