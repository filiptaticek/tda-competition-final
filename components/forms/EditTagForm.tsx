import { UniversalForm } from "./UniversalForm"
import { useDispatch } from "react-redux"
import { removeSingleTag, updateSingleTag } from "../../src/store/actions"
import { useState } from "react"
import { deleteRequest, putRequest  } from "../../src/functions"
import { SelectColor, UniversalInput, FormButton } from "../formParts"
import { Color } from "../../src/types"

export const EditTagForm = ({name,description,color,id, closeForm}:any)=>{

  const dispatch = useDispatch()
  const [tagName, setName] = useState<string>(name)
  const [tagDescription, setDescription] = useState<string>(description)
  const [tagColor, setColor] = useState<Color>(color)
  
  const handleEditingTag = (event:any)=>{
    event?.preventDefault()
    const updatedTag = {
      name:tagName,
      description:tagDescription,
      color:tagColor,
      id:id
    }
    console.log("Upraveno",updatedTag)
    putRequest("tag",id,updatedTag)
    console.log(updatedTag, id)
    dispatch(updateSingleTag(id,updatedTag))
    closeForm()
  }

  const handleDeletingTag = (event:any)=>{
    event?.preventDefault()
    deleteRequest("tag",id)
    console.log("Tag smazán")
    dispatch(removeSingleTag(id))
    closeForm()
  }

  return(
    <UniversalForm className="pt-[150px]" header={<>Edit tag <strong> {name}</strong></>} onSubmit={handleEditingTag} closeForm={closeForm}>
      <UniversalInput max={true} text="Edit the name of the tag" value={tagName} onChange={(event:any)=>{setName(event.target.value)}}/> 
      <UniversalInput text="Edit the description of the tag" value={tagDescription} onChange={(event:any)=>{setDescription(event.target.value)}}/> 
      <SelectColor color={color} value={tagColor} onChange={(event:any)=>{setColor(event.target.value)}} text="Edit the color of your tag" />
      <div className="flex mt-8">
        <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
        <FormButton onClick={handleDeletingTag} className="bg-button_red" text="Delete entry"/>
      </div>
    </UniversalForm>
  )
}