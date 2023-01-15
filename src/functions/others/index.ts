import DOMPurify from "dompurify"

export const sntz = (thing:any)=>{ //function that sanitizes inputs against XXS attacks
  return(DOMPurify.sanitize(thing))
}

export const isOnlyLetters = (word:string) =>{
  return /^[a-zA-ZěŠšČčŘřŽžÝýÍíÁáÉéŮůÚú]+$/.test(word)
}

export const capitalize = (word:string)=>{
  return(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}