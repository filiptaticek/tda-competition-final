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
      <p onClick={()=>dispatch(toggleSidebarVisbility())} className="my-10 text-5xl text-center font-bold">Programming. <span className="text-main_color">Daily.</span></p>
      <img className="md:relative mb-10 md:mb-0 left-[100px] top-[-55px] m-auto md:m-0 md:mt-[-20px] cursor-pointer w-[30px]" src="otevrit_stranku.png" onClick={()=>dispatch(toggleSidebarVisbility())}/>
    </>
  )
}