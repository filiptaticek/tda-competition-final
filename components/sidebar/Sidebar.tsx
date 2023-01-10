/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from "react-redux"
import { toggleSidebarVisbility } from "../../src/store/actions"
import { SideBarLink } from "./SideBarLink"

export const Sidebar = ()=>{

  const isOpen = useSelector((state:any) => state.sidebar)
  const dispatch = useDispatch()

  return(
    <div
      className={`${
        isOpen ? "w-[350px] p-20" : "w-0"
      } h-full fixed top-0 left-0 z-10 bg-main_color border border-black duration-300`}
    >
      <div className={` ${isOpen?"block":"hidden"} text-white text-2xl`}>
        <img className="fixed top-10 cursor-pointer left-[300px] w-[20px]" src="zavrit_stranku.png" onClick={()=>dispatch(toggleSidebarVisbility())}/>
        <SideBarLink text="Home" href="/" />
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