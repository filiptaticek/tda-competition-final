import Link from "next/link"
import { useDispatch } from "react-redux"
import { toggleSidebarVisbility } from "../../src/store/actions"
import { useSelector } from "react-redux"


interface ISideBarLink {
    text:string,
    href:string
}

export const SideBarLink = ({text,href}:ISideBarLink)=>{

  const dispatch = useDispatch()
  const page = useSelector((state:any) => state.page)

  return (
    <Link 
      className={`hover:font-bold 
      ${page==="home"&&text==="Calendar" ? "font-bold" : ""}
      ${page==="all_entries"&&text==="All Entries" ? "font-bold" : ""}
      ${page==="tags"&&text==="Tags" ? "font-bold" : ""}
      ${page==="users"&&text==="Users" ? "font-bold" : ""}

      `} 
      onClick={()=>dispatch(toggleSidebarVisbility())} 
      href={href}>{text} </Link>
  )
}
