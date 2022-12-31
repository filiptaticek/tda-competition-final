import clsx from "clsx"

interface IFormButton {
    className:string
    text:string
    onClick?:any
    type?:"button" | "submit" | "reset"
}

export const FormButton = ({className,text,onClick,type}:IFormButton)=>{

  const tip = type?type:undefined

  return(
    <button 
      className={clsx("m-auto w-[50%] px-5 py-2 rounded-md border border-black font-bold",className)}
      onClick={onClick}
      type={tip}
    >
      {text}
    </button>
  )
}