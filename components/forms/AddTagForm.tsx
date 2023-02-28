import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UniversalForm } from "./UniversalForm"
import { addSingleTag } from "../../src/store/actions"
import { capitalize, postRequest,sntz } from "../../src/functions"
import { SelectColor, FormButton, UniversalInput } from "../formParts"
import { Color, State } from "../../src/types"
import { BlueWhiteButton } from "../formParts/BlueWhiteButton"

export const AddTagForm = ()=>{

  const [showForm,setFormShown] = useState<boolean>(false)
  const [name,setName] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [color,setColor] = useState<Color>("red" as Color)
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: State) => state)

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
      <div className="mb-10 flex">
        <BlueWhiteButton className="m-auto w-[151px]" onClick={()=>setFormShown(true)} text="Add tags"/>
      </div>
      {showForm&&
      <UniversalForm className="pt-[150px]" header="Add new tag" closeForm={()=>setFormShown(false)} onSubmit={handleAddingTags}>
        <UniversalInput required={true} max={true} text="Fill in the name of the tag" value={name} onChange={handleName} />
        <UniversalInput required={true} text="Fill in the description of the tag" value={description} onChange={(event:any)=>{setDescription(sntz(event.target.value))}} />
        <SelectColor text="Choose from eight different colors" value={color} onChange={(event:any)=>{setColor(sntz(event.target.value))}} />
        <div className="mt-8 flex">
          <FormButton className="bg-button_green" type="submit" text="Add the tag"/>
        </div>
      </UniversalForm>
      }
    </>
  )
}