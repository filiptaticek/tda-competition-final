/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"

import { useSelector } from "react-redux"

import { IUser } from "../src/types"
import { EditUserForm } from "./forms/EditUserForm"

export const User = ({ name, surname, id, email, password, username, admin }: IUser) => {
  const mode = useSelector((state: any) => state.mode)
  const [showForm, setFormShown] = useState<boolean>(false)

  return (
    <div
      className={`my-1 w-[80%] rounded-2xl md:w-[55%] ${
        mode ? "border-white bg-entry_color hover:bg-[#284260]" : "border-black hover:bg-gray-100"
      } m-auto flex border-2 p-5 text-xl`}
    >
      <p className={`${mode ? "text-white" : ""} w-full`}>
        <span className="font-bold">
          {name} {surname}
        </span>
        {admin ? " {admin}" : " {user}"}
      </p>
      <div className="h-fit w-full">
        <img
          onClick={() => setFormShown(true)}
          src={mode ? "upravit_zaznam_bily.png" : "upravit_zaznam.png"}
          className="float-right h-7 cursor-pointer"
        />
      </div>
      {showForm && (
        <EditUserForm
          id={id}
          closeForm={() => setFormShown(false)}
          name={name}
          surname={surname}
          email={email}
          password={password}
          username={username}
          admin={admin}
        />
      )}
    </div>
  )
}
