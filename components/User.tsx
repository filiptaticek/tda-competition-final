/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { EditUserForm } from "./forms/EditUserForm"

export const User = ({firstName,surname,id}:{firstName:string,surname:string,id:number})=>{

  const [showForm, setFormShown] = useState<boolean>(false)


  return(
    <div className="w-[90%] text-xl p-5 m-auto border border-black flex">
      <p className="w-full">{firstName} {surname}</p>
      <div className="h-fit w-full">
        {
          //<img onClick={handleDeletingUser} src="bin.png" className="float-right h-7 cursor-pointer" />
        }
        <img onClick={()=>setFormShown(true)} src="upravit_zaznam.png" className="float-right h-7 cursor-pointer" />
      </div>
      {showForm&&
        <EditUserForm 
          id={id} 
          closeForm={()=>setFormShown(false)} 
          firstName={firstName}
          surname={surname}
        />
      }
    </div>
  )
}