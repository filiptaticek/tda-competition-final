import { UniversalForm } from "./UniversalForm"
import { useDispatch } from "react-redux"
import { removeSingleUser, updateSingleUser } from "../../src/store/actions"
import { useState } from "react"
import { putRequest,capitalize, deleteRequest, isOnlyLetters } from "../../src/functions"
import { UniversalInput, FormButton } from "../formParts"

export const EditUserForm = ({closeForm,id,name,surname}:{closeForm:any,id:number,name:string,surname:string})=>{

  const dispatch = useDispatch()
  const [firstNameState, setFirstName] = useState<string>(name)
  const [surnameState, setSurname] = useState<string>(surname)

  const handleFirstName = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setFirstName(capitalize(word))
    }
  }

  const handleSurname = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setSurname(capitalize(word))
    }
  }
  
  const handleEditingUser = (event:any)=>{
    event?.preventDefault()
    const updatedProgrammer = {
      name:firstNameState,
      surname:surnameState,
      id:id
    }
    console.log("Upraveno",updatedProgrammer)
    putRequest("programmer",id,updatedProgrammer)
    dispatch(updateSingleUser(id,updatedProgrammer))
    closeForm()
  }

  const handleDeletingUser = (event:any)=>{
    event?.preventDefault()
    deleteRequest("programmer",id)
    console.log("ahoj")
    dispatch(removeSingleUser(id))
    closeForm()
  }

  return(
    <UniversalForm className="pt-[150px]" header={<>Edit user <strong> {name} {surname}</strong></>} onSubmit={handleEditingUser} closeForm={closeForm}>
      <UniversalInput text="Edit the first name of the user" value={firstNameState} onChange={handleFirstName}/> 
      <UniversalInput text="Edit the surname of the user" value={surnameState} onChange={handleSurname}/> 
      <div className="flex mt-8">
        <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
        <FormButton onClick={handleDeletingUser} className="bg-button_red" text="Delete"/>
      </div>
    </UniversalForm>
  )
}