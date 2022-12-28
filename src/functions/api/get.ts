import axios from "axios"
import { baseUrl } from "../../constants"
import { FAKE_DATA } from "../../fake_data"

export const getRequest = async () => {
  try {
    const response = await axios.get(`${baseUrl}/record`)
    //console.log(`Toto přišlo z backendu: ${response.data}`)
    return(response.data)
  } catch (error) {
    //console.error(error)
    return(FAKE_DATA)
  }
}