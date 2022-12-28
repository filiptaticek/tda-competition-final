export function getEstheticDate(dateString:string) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1 // Month is 0-based, so we need to add 1 to get the correct month
  const year = date.getFullYear()
  
  return `${day}.${month}. ${year}`
}