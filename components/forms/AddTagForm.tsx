import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UniversalForm } from "./UniversalForm"
import { addSingleTag } from "../../src/store/actions"
import { capitalize, postRequest,sntz } from "../../src/functions"
import { SelectColor, FormButton, UniversalInput } from "../formParts"
import { Color } from "../../src/types"

export const AddTagForm = ()=>{

  const [showForm,setFormShown] = useState<boolean>(false)
  const [name,setName] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [color,setColor] = useState<Color>("red" as Color)
  const dispatch = useDispatch()
  const mode = useSelector((state:any) => state.mode)
  const token = useSelector((state:any) => state.token)
  const user = useSelector((state:any) => state.user)

  const handleAddingTags = async (event:any)  =>{
    event?.preventDefault()
    setFormShown(false)
    const toCoPosilam = {name,description,color,id:1,programmer_id:user.id}
    const toCoPrislo = await postRequest(toCoPosilam,"tag",token)
    dispatch(addSingleTag(toCoPrislo))
    setName(""),setDescription("")
  }

  const handleName = (event:any) => {
    setName(sntz(capitalize(event.target.value)))
  }

  return(
    <>
      <div className="flex mb-10">
        <FormButton className={` w-[151px] m-auto ${mode?"text-main_color bg-white":"text-white bg-main_color"}`} onClick={()=>setFormShown(true)} text="Add tags" />
      </div>
      {showForm&&
      <UniversalForm className="pt-[150px]" header="Add new tag" closeForm={()=>setFormShown(false)} onSubmit={handleAddingTags}>
        <UniversalInput required={true} max={true} text="Fill in the name of the tag" value={name} onChange={handleName} />
        <UniversalInput required={true} text="Fill in the description of the tag" value={description} onChange={(event:any)=>{setDescription(sntz(event.target.value))}} />
        <SelectColor text="Choose from eight different colors" value={color} onChange={(event:any)=>{setColor(sntz(event.target.value))}} />
        <div className="flex mt-8">
          <FormButton className="bg-button_green" type="submit" text="Add the tag"/>
        </div>
      </UniversalForm>
      }
    </>
  )
}