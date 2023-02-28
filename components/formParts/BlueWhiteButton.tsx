import clsx from "clsx"
import { Button } from "../../src/types"
import { useSelector } from "react-redux"

interface IFormButton {
    className:string
    text:string
    onClick?:any
    type?:Button,
    main_color?:boolean
}

export const BlueWhiteButton = ({className,text,onClick,type}:IFormButton)=>{

  const mode = useSelector((state: any) => state.mode)

  return(
    <button 
      className={clsx(
        "m-auto w-[50%] rounded-2xl px-5 py-2 font-bold text-white",
        mode?"bg-white text-main_color hover:opacity-80":"bg-main_color hover:bg-[#3FA5FF]", 
        className
      )}
      onClick={onClick}
      type={type?type:undefined}
    >
      {text}
    </button>
  )
}