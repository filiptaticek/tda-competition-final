/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import clsx from "clsx"
import { useSelector, useDispatch } from "react-redux"
import { toggleSidebarVisbility } from "../../src/store/actions"
import { SideBarLink } from "./SideBarLink"

export const Sidebar = ()=>{

  const isOpen = useSelector((state:any) => state.sidebar)
  const dispatch = useDispatch()
  const mode = useSelector((state:any) => state.mode)

  return(
    <div
      className={`
      ${isOpen ? "w-[350px] p-20" : "w-0"}
      ${mode ? "bg-white text-main_color" : clsx("text-white","bg-main_color")}
      h-full fixed top-0 left-0 z-10 duration-300 text-white`
      }
    >
      <div className={` ${isOpen?"block":"hidden"} text-2xl`}>
        <img className="fixed top-[20px] cursor-pointer left-[280px] w-[50px]" src={mode?"zavrit_stranku_fialove.png":"zavrit_stranku.png"} onClick={()=>dispatch(toggleSidebarVisbility())}/>
        <SideBarLink text="Calendar" href="/" />
        <br/>
        <br/>
        <SideBarLink text="All Entries" href="/all_entries" />
        <br/>
        <br/>
        <SideBarLink text="Users" href="/users" />
        <br/>
        <br/>
        <SideBarLink text="Tags" href="/tags" />
      </div>
    </div>
  )
}