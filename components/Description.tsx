//just a small component used in Forms
export const Description = ({text}:{text:string})=>{
  return(
    <span className="font-bold text-sm">
      {text}
    </span>
  )
}