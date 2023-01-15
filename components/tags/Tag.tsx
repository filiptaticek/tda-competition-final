/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx"
import { useState } from "react"
import { ITag } from "../../src/types"
import { EditTagForm } from "../forms/EditTagForm"
import { returnTagColor } from "./MiniTagIcon"

export const Tag = ({name,color,description,id}:ITag)=>{

  const [showForm, setFormShown] = useState<boolean>(false)

  return(
    <div className={clsx("m-auto sm:m-0 my-1 sm:my-0 rounded-sm w-min lg:ms-1 px-2 py-5 w-[150px] h-[300px]",returnTagColor(color))}>
      <p className="text-xl text-center font-bold text-white w-full">{name}</p>
      <p className="text-xl text-center h-[200px] text-white">{description}</p>
      <div className="h-fit w-full">
        <img onClick={()=>setFormShown(true)} src="upravit_zaznam_bily.png" className="m-auto mt-2 h-7 cursor-pointer" />
      </div>
      {showForm&&
        <EditTagForm
          name={name}
          color={color}
          description={description}
          id={id}
          closeForm={()=>{setFormShown(false)}}
        />
      }
    </div>
  )
}