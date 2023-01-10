import { useState } from "react"
import { useDispatch } from "react-redux"
import { UniversalForm } from "./UniversalForm"
import { addSingleTag } from "../../src/store/actions"
import { capitalize, isOnlyLetters, postRequest } from "../../src/functions"
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
    const word = event.target.value
    if (isOnlyLetters(word)){
      setName(capitalize(word))
    }
  }

  return(
    <>
      <div className="flex mb-2">
        <FormButton className="bg-main_color w-[150px] m-auto" onClick={()=>setFormShown(true)} text="Add tags" />
      </div>
      {showForm&&
      <UniversalForm header="Add new user" closeForm={()=>setFormShown(false)} onSubmit={handleAddingTags}>
        <UniversalInput text="Fill in the name of the tag" value={name} onChange={handleName} />
        <UniversalInput text="Fill in the description of the tag" value={description} onChange={(event:any)=>{setDescription(event.target.value)}} />
        <SelectColor text="Fill in the color of the tag" value={color} onChange={(event:any)=>{setColor(event.target.value)}} />
        <div className="flex mt-8">
          <FormButton className="bg-button_green" type="submit" text="Add the tag"/>
        </div>
      </UniversalForm>
      }
    </>
  )
}