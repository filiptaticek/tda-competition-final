import DOMPurify from "dompurify"

export const sanitize = (thing:any)=>{
  DOMPurify.sanitize(thing)
}

export const isOnlyLetters = (word:string) =>{
  return /^[a-zA-Zěščřžýíáé]+$/.test(word)
}

export const capitalize = (word:string)=>{
  return(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}