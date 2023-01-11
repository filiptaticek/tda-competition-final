import DOMPurify from "dompurify"
import { Color } from "../types"

export const sanitize = (thing:any)=>{
  DOMPurify.sanitize(thing)
}

export const isOnlyLetters = (word:string) =>{
  return /^[a-zA-Zěščřžýíáé]+$/.test(word)
}

export const capitalize = (word:string)=>{
  return(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}

export const returnTagColor = (color:Color)=> {switch (color) {
case "orange":return("bg-[#FFAA00]");case "red":return("bg-[#FF5562]")
case "blue":return("bg-[#001BFF]");case "green":return("bg-[#59D957]")
case "purple":return("bg-main_color");case "pink":return("bg-[#FE62EE]")
case "yellow":return("bg-[#F3E400]")
}}