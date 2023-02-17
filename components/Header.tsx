import { Sidebar } from "./sidebar/Sidebar"
import { useDispatch,useSelector } from "react-redux"
import { toggleMode } from "../src/store/actions"
import clsx from "clsx"
import { MyAccount } from "./MyAccount"
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const Header = ()=>{
  const dispatch = useDispatch()
  const mode = useSelector((state:any) => state.mode)
  const user = useSelector((state:any) => state.user)

  return(
    <div>
      <div className="flex w-[92%] mb-10 m-auto">
        <Sidebar />
        <p>{user.name}</p>
        <p className={clsx("w-[60%] text-5xl text-center font-bold",!mode?"":"text-white")}>Programming. <span className={!mode?"text-main_color":"text-white"}>Logout.</span></p>
        <div className="pt-2 flex justify-end w-[20%]">
          <MyAccount />
          <img className="w-[40px] h-[40px] float hidden sm:block cursor-pointer" src={mode?"zmena_modu_bila.png":"zmena_modu.png"} onClick={()=>dispatch(toggleMode())}/>
        </div>
      </div>
      <div className="block flex mb-8 w-fit m-auto sm:hidden">
        <img className="cursor-pointer w-[40px] mr-5" src={mode?"otevrit_stranku_bila.png":"otevrit_stranku.png"} onClick={()=>/*dispatch(toggleSidebarVisbility())*/console.log("")}/>
        <img className="cursor-pointer w-[40px]" src={mode?"zmena_modu_bila.png":"zmena_modu.png"} onClick={()=>dispatch(toggleMode())}/>
      </div>
    </div>
  )
}