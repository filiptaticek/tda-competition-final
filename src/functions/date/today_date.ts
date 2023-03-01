export function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = ("0" + (today.getMonth() + 1)).slice(-2) // +1, protože leden má index 0
  const day = ("0" + today.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}