import Link from "next/link"
import { useDispatch } from "react-redux"
import { toggleSidebarVisbility } from "../src/store/actions"

interface ISideBarLink {
    text:string,
    href:string
}

export const SideBarLink = ({text,href}:ISideBarLink)=>{

  const dispatch = useDispatch()

  return(
    <Link className="hover:font-bold" onClick={()=>dispatch(toggleSidebarVisbility())} href={href}>{text}</Link>
  )
}
