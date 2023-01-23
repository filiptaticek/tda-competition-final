import { Sidebar } from "./sidebar/Sidebar"
import { useDispatch,useSelector } from "react-redux"
import { toggleMode, toggleSidebarVisbility } from "../src/store/actions"
import clsx from "clsx"
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const Header = ()=>{
  const dispatch = useDispatch()
  const mode = useSelector((state:any) => state.mode)

  return(
    <div>
      <Sidebar />
      <p onClick={()=>dispatch(toggleSidebarVisbility())} className={clsx("my-5 text-5xl text-center font-bold",!mode?"":"text-white")}>Programming. <span className={!mode?"text-main_color":"text-white"}>Daily.</span></p>
      <img className="md:relative mb-10 md:mb-0 left-[100px] top-[-35px] m-auto md:m-0 md:mt-[-30px] cursor-pointer w-[40px]" src={mode?"otevrit_stranku_bila.png":"otevrit_stranku.png"} onClick={()=>dispatch(toggleSidebarVisbility())}/>
      <img className="md:relative mb-10 md:mb-0 left-[1300px] top-[-35px] m-auto md:m-0 md:mt-[-30px] cursor-pointer w-[40px]" src={mode?"zmena_modu_bila.png":"zmena_modu.png"} onClick={()=>dispatch(toggleMode())}/>
    </div>
  )
}