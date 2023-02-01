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
      <div className="flex w-[92%] mb-10 m-auto">
        <div className="w-[20%] pt-2"><img className="w-[40px] h-[40px] hidden sm:block cursor-pointer" src={mode?"otevrit_stranku_bila.png":"otevrit_stranku.png"} onClick={()=>dispatch(toggleSidebarVisbility())}/></div>
        <p onClick={()=>dispatch(toggleSidebarVisbility())} className={clsx("w-[60%] text-5xl text-center font-bold",!mode?"":"text-white")}>Programming. <span className={!mode?"text-main_color":"text-white"}>Daily.</span></p>
        <div className="pt-2 flex justify-end w-[20%]"><img className="w-[40px] h-[40px] float hidden sm:block cursor-pointer" src={mode?"zmena_modu_bila.png":"zmena_modu.png"} onClick={()=>dispatch(toggleMode())}/></div>
      </div>
      <div className="block flex mb-8 w-fit m-auto sm:hidden">
        <img className="cursor-pointer w-[40px] mr-5" src={mode?"otevrit_stranku_bila.png":"otevrit_stranku.png"} onClick={()=>dispatch(toggleSidebarVisbility())}/>
        <img className="cursor-pointer w-[40px]" src={mode?"zmena_modu_bila.png":"zmena_modu.png"} onClick={()=>dispatch(toggleMode())}/>
      </div>
    </div>
  )
}