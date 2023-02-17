/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"
import { SideBarLink } from "./SideBarLink"
import { useState } from "react"

export const Sidebar = ()=>{

  const mode = useSelector((state:any) => state.mode)
  const user = useSelector((state:any) => state.user)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return(
    <div className="w-[20%]">
      <img 
        className="w-[40px] h-[40px] hidden sm:block cursor-pointer" 
        src={mode?"otevrit_stranku_bila.png":"otevrit_stranku.png"} 
        onClick={()=>setIsOpen(true)}/>
      <div
        className={`
      ${isOpen ? "w-[350px] p-20" : "w-0"} ${mode?isOpen&&"border border-white":""} bg-main_color h-full fixed top-0 left-0 z-10 duration-300 text-white`
        }
      >
        <div className={` ${isOpen?"block":"hidden"} text-2xl`}>
          <img className="fixed top-[20px] cursor-pointer left-[280px] w-[50px]" src={"zavrit_stranku.png"} onClick={()=>setIsOpen(false)}/>
          <SideBarLink text="Calendar" href="/" />
          <br/>
          <br/>
          <SideBarLink text="All Entries" href="/all_entries" />
          <br/>
          <br/>
          {user.admin&&
          <>
            <SideBarLink text="Manage" href="/manage_users" />
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