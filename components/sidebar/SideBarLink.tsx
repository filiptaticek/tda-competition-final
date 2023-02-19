import Link from "next/link"
import { useSelector } from "react-redux"


interface ISideBarLink {
    text:string,
    href:string
}

export const SideBarLink = ({text,href}:ISideBarLink)=>{

  const page = useSelector((state:any) => state.page)

  return (
    <Link 
      className={`hover:font-bold 
      ${page==="home"&&text==="Calendar"?"font-bold" : ""}
      ${page==="all_entries"&&text==="All Entries"?"font-bold":""}
      ${page==="tags"&&text==="Tags" ? "font-bold" : ""}
      ${page==="manage_users"&&text==="Manage users" ? "font-bold" : ""}

      `} 
      href={href}>{text} </Link>
  )
}
