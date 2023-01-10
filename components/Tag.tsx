/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx"
import { useState } from "react"
import { Color,ITag } from "../src/types"
import { EditTagForm } from "./forms/EditTagForm"

export const Tag = ({name,color,description,id}:ITag)=>{

  const [showForm, setFormShown] = useState<boolean>(false)

  const returnTagColor = (color:Color)=> {switch (color) {
  case "orange":return("bg-orange-400");case "red":return("bg-red-400")
  case "blue":return("bg-blue-400");case "green":return("bg-green-400")
  case "purple":return("bg-purple-400");case "pink":return("bg-pink-400")
  case "yellow":return("bg-yellow-300")
  }}

  return(
    <div className={clsx("w-[50%] my-2 rounded-r-full text-xl p-5 m-auto border border-black flex",returnTagColor(color))}>
      <p className="text-white w-full"><strong>{name}</strong><span className="ml-10">{description}</span>{id}</p>
      <div className="h-fit w-full">
        <img onClick={()=>setFormShown(true)} src="upravit_zaznam.png" className="float-right h-7 cursor-pointer" />
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