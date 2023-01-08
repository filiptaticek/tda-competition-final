import clsx from "clsx"
import { Button } from "../../src/types"

interface IFormButton {
    className:string
    text:string
    onClick?:any
    type?:Button
}

export const FormButton = ({className,text,onClick,type}:IFormButton)=>{

  const tip = type?type:undefined

  return(
    <button 
      className={clsx("hover:opacity-80 m-auto w-[50%] px-5 py-2 rounded-md text-white font-bold",className)}
      onClick={onClick}
      type={tip}
    >
      {text}
    </button>
  )
}