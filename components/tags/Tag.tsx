/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { useState } from "react"

import clsx from "clsx"
import { useSelector } from "react-redux"

import { ITag } from "../../src/types"
import { EditTagForm } from "../forms/EditTagForm"
import { returnTagColor } from "./MiniTagIcon"

export const Tag = ({ name, color, description, id }: ITag) => {
  const [showForm, setFormShown] = useState<boolean>(false)
  const mode = useSelector((state: any) => state.mode)

  return (
    <div
      className={clsx("m-1 h-[300px] w-[150px] rounded-2xl border-2 px-2 py-5 lg:m-1", returnTagColor(color), mode ? "border-white" : "border-black")}
    >
      <p className="w-full text-center text-xl font-bold text-white">{name}</p>
      <p className="h-[200px] text-center text-xl text-white">{description}</p>
      <div className="h-fit w-full">
        <img onClick={() => setFormShown(true)} src="upravit_zaznam_bily.png" className="m-auto mt-2 h-7 cursor-pointer" />
      </div>
      {showForm && (
        <EditTagForm
          name={name}
          color={color}
          description={description}
          id={id}
          closeForm={() => {
            setFormShown(false)
          }}
        />
      )}
    </div>
  )
}
