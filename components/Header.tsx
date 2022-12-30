import { Sidebar } from "./Sidebar"
import { useDispatch } from "react-redux"
import { toggleSidebarVisbility } from "../src/store/actions"
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const Header = ()=>{
  const dispatch = useDispatch()
  return(
    <>
      <Sidebar />
      <img className="relative top-[80px] mt-[-20px] cursor-pointer w-[30px] left-[100px]" src="otevrit_stranku.png" onClick={()=>dispatch(toggleSidebarVisbility())}/>
      <p onClick={()=>dispatch(toggleSidebarVisbility())} className="my-10 text-5xl text-center font-bold">Programming. Daily.</p>
    </>
  )
}