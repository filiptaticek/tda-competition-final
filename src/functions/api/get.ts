import axios from "axios"
import { baseUrl } from "../../constants"
import { FAKE_DATA } from "../../fake_data"

export const getRequest = async () => {
  try {
    const response = await axios.get(`${baseUrl}/record`)
    return(response.data)
  } catch (error) {
    //console.error(error)
    return(FAKE_DATA)
  }
}