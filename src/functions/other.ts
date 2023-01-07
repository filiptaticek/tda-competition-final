import DOMPurify from "dompurify"

export const sanitize = (thing:any)=>{
  DOMPurify.sanitize(thing)
}
