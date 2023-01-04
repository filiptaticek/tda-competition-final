/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { deleteRequest } from "../src/functions"
import { useDispatch } from "react-redux"
import { removeSingleUser } from "../src/store/actions"

export const User = ({firstName,surname,programmer_id}:{firstName:string,surname:string,programmer_id:number})=>{

  const dispatch = useDispatch()

  const handleDeletingUser = ()=>{
    deleteRequest("programmer",programmer_id)
    console.log("ahoj")
    dispatch(removeSingleUser(programmer_id))
  }

  return(
    <div className="w-[90%] text-xl p-5 m-auto border border-black flex">
      <p className="w-full">{firstName} {surname}</p>
      <div className="h-fit w-full">
        <img onClick={handleDeletingUser} src="bin.png" className="float-right h-7 cursor-pointer" />
      </div>
    </div>
  )
}