import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { removeSingleTag, updateSingleTag } from "../../src/store/actions"
import { deleteRequest, putRequest, sntz  } from "../../src/functions"
import { UniversalForm } from "./UniversalForm"
import { SelectColor, UniversalInput, FormButton } from "../formParts"
import { Color } from "../../src/types"

export const EditTagForm = ({name,description,color,id, closeForm}:any)=>{

  const dispatch = useDispatch()
  const [tagName, setName] = useState<string>(name)
  const [tagDescription, setDescription] = useState<string>(description)
  const [tagColor, setColor] = useState<Color>(color)
  const token = useSelector((state:any) => state.token)
  
  const handleEditingTag = (event:any)=>{
    event?.preventDefault()
    const updatedTag = {
      name:tagName,
      description:tagDescription,
      color:tagColor,
      id:id
    }
    putRequest("tag",id,updatedTag, token)
    dispatch(updateSingleTag(id,updatedTag))
    closeForm()
  }

  const handleDeletingTag = (event:any)=>{
    event?.preventDefault()
    deleteRequest("tag",id, token)
    dispatch(removeSingleTag(id))
    closeForm()
  }

  return(
    <UniversalForm className="pt-[150px]" header={<>Edit tag <strong> {name}</strong></>} onSubmit={handleEditingTag} closeForm={closeForm}>
      <UniversalInput required={true} max={true} text="Edit the name of the tag" value={tagName} onChange={(event:any)=>{setName(sntz(event.target.value))}}/> 
      <UniversalInput required={true} text="Edit the description of the tag" value={tagDescription} onChange={(event:any)=>{setDescription(sntz(event.target.value))}}/> 
      <SelectColor color={color} value={tagColor} onChange={(event:any)=>{setColor(event.target.value)}} text="Edit the color of your tag" />
      <div className="mt-8 flex">
        <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
        <FormButton onClick={handleDeletingTag} className="bg-button_red" text="Delete"/>
      </div>
    </UniversalForm>
  )
}