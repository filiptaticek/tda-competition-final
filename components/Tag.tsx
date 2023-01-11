/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx"
import { useState } from "react"
import { Color,ITag } from "../src/types"
import { EditTagForm } from "./forms/EditTagForm"

export const Tag = ({name,color,description,id}:ITag)=>{

  const [showForm, setFormShown] = useState<boolean>(false)

  const returnTagColor = (color:Color)=> {switch (color) {
  case "orange":return("bg-[#FFAA00]");case "red":return("bg-[#FF5562]")
  case "blue":return("bg-[#001BFF]");case "green":return("bg-[#59D957]")
  case "purple":return("bg-main_color");case "pink":return("bg-[#FE62EE]")
  case "yellow":return("bg-[#F3E400]")
  }}

  return(
    <div className={clsx("w-min m-1 py-5 w-[150px] h-[300px] border border-black",returnTagColor(color))}>
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