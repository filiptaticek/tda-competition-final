import { UniversalForm } from "./forms"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FormButton } from "./formParts"
import { setUser } from "../src/store/actions"
import { getRequest } from "../src/functions"
import { saveAs } from "file-saver"
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const MyAccount = ()=>{

  const dispatch = useDispatch()
  const [detailShown, setDetailShown] = useState<boolean>(false)
  const mode = useSelector((state:any) => state.mode)
  const user = useSelector((state:any) => state.user)
  const token = useSelector((state:any) => state.token)

  const handleExport = async (event:any)=>{
    event.preventDefault()
    const karel = await getRequest("export",token)
    const blob = new Blob([karel], { type: "text/csv" })
    saveAs(blob, "my_records_data.csv") 
  }

  const Category = ({category,value}:{category:string,value:string})=>{
    return(
      <p className="text-xl my-2"><span className="font-bold">{category}: </span>{value}</p>
    )
  }

  return(
    <>
      <img 
        className="w-[40px] h-[40px] hidden sm:block cursor-pointer mr-8" 
        src={mode?"user_white.png":"user.png"} 
        onClick={()=>setDetailShown(true)}
      />
      {detailShown&&
      <UniversalForm className="pt-[120px] text-center" header={<span className="font-bold">Your account</span>} closeForm={()=>setDetailShown(false)}>
        <Category category="Name" value={user.name} />
        <Category category="Surname" value={user.surname} />
        <Category category="Username" value={user.username} />
        <Category category="Permission" value={user.admin?"Admin":"User"} />
        <Category category="Email" value={user.email} />
        <div className="flex mt-5">
          <FormButton className="bg-button_green mr-2" type="submit" onClick={handleExport} text="Export your records"/>
          <FormButton className="bg-button_red" text="Log out" onClick={()=>{dispatch(setUser(null)),window.localStorage.clear()}} />
        </div>
      </UniversalForm>
      }
    </>
  )
}