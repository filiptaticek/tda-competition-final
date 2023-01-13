import { useState } from "react"
import { useDispatch } from "react-redux"
import { UniversalForm } from "./UniversalForm"
import { addSingleTag } from "../../src/store/actions"
import { capitalize, postRequest } from "../../src/functions"
import { Color } from "../../src/types"
import { SelectColor, FormButton, UniversalInput } from "../formParts"

export const AddTagForm = ()=>{

  const [showForm,setFormShown] = useState<boolean>(false)
  const [name,setName] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [color,setColor] = useState<Color>("red" as Color)
  const dispatch = useDispatch()

  const handleAddingTags = async (event:any)  =>{
    event?.preventDefault()
    setFormShown(false)
    const toCoPrislo = await postRequest({name,description,color,id:1},"tag")
    dispatch(addSingleTag(toCoPrislo))
    setName(""),setDescription("")
  }

  const handleName = (event:any) => {
    setName(capitalize(event.target.value))
  }

  return(
    <>
      <div className="flex mb-10">
        <FormButton className="bg-main_color w-[151px] m-auto" onClick={()=>setFormShown(true)} text="Add tags" />
      </div>
      {showForm&&
      <UniversalForm className="pt-[150px]" header="Add new tag" closeForm={()=>setFormShown(false)} onSubmit={handleAddingTags}>
        <UniversalInput max={true} text="Fill in the name of the tag" value={name} onChange={handleName} />
        <UniversalInput text="Fill in the description of the tag" value={description} onChange={(event:any)=>{setDescription(event.target.value)}} />
        <SelectColor text="Choose from eight different colors" value={color} onChange={(event:any)=>{setColor(event.target.value)}} />
        <div className="flex mt-8">
          <FormButton className="bg-button_green" type="submit" text="Add the tag"/>
        </div>
      </UniversalForm>
      }
    </>
  )
}