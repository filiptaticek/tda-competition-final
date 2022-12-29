//this function takes format "2022-12-29 14:16:37" and makes it format 26.12. 2022
export function getEstheticDate(dateString:string) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  return `${day}.${month}. ${year}`
}