/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"
import { SideBarLink } from "./SideBarLink"
import { useState } from "react"
import { State } from "../../src/types"
import clsx from "clsx"

export const Sidebar = ({hidden}:{hidden?:boolean})=>{

  const { mode, user } = useSelector((state: State) => state)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return(
    <div className={clsx("w-[20%]",hidden&&"hidden md:block")}>
      <img 
        className="h-[40px] min-w-[40px] cursor-pointer border border-black" 
        src={mode?"otevrit_stranku_bila.png":"otevrit_stranku.png"} 
        onClick={()=>setIsOpen(true)}/>
      <div
        className={`
      ${isOpen ? "w-[350px] p-20" : "w-0"} ${mode?isOpen&&"border border-white bg-main_color":"bg-light_blue"} fixed top-0 left-0 z-10 h-full text-white duration-300`
        }
      >
        <div className={` ${isOpen?"block":"hidden"} text-2xl`}>
          <img className="fixed top-[20px] left-[280px] w-[50px] cursor-pointer" src={"zavrit_stranku.png"} onClick={()=>setIsOpen(false)}/>
          <SideBarLink text="Calendar" href="/" />
          <br/>
          <br/>
          <SideBarLink text="All Entries" href="/all_entries" />
          <br/>
          <br/>
          {user.admin&&
          <>
            <SideBarLink text="Manage users" href="/manage_users" />
            <br/>
            <br/>
          </>
          }
          <SideBarLink text="Tags" href="/tags" />
        </div>
      </div>
    </div>
  )
}