import axios from "axios"
import { baseUrl } from "../constants"

export const postRequest = async (data: object) => {
  try {
    const response = await axios.post(baseUrl, data)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}