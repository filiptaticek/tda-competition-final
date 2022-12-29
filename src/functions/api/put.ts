import axios from "axios"
import { baseUrl } from "../../constants"
import { IDiaryEntry } from "../../types"

export const putRequest = async (id: number, entry: IDiaryEntry)=> {
  try {
    //await axios.put(`${baseUrl}/records/${id}`, entry)
    await axios.put(`${baseUrl}/record/${id}`, entry)
  } catch (error) {
    console.error(error)
  }
}