import { UniversalForm } from "./UniversalForm"
import { FormButton } from "../formParts/FormButton"
import { useDispatch } from "react-redux"
import { deleteRequest } from "../../src/functions/api/delete"
import { removeSingleUser, updateSingleUser } from "../../src/store/actions"
import { useState } from "react"
import { putRequest } from "../../src/functions/api/put"
import { UniversalInput } from "../formParts"

export const EditUserForm = ({closeForm,id,firstName,surname}:{closeForm:any,id:number,firstName:string,surname:string})=>{

  const dispatch = useDispatch()
  const [firstNameState, setFirstName] = useState<string>(firstName)
  const [surnameState, setSurname] = useState<string>(surname)

  const handleEditingUser = (event:any)=>{
    event?.preventDefault()
    const updatedProgrammer = {
      first_name:firstNameState,
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
    <UniversalForm header={<>Edit user <strong> {firstName} {surname}</strong></>} onSubmit={handleEditingUser} closeForm={closeForm}>
      <UniversalInput text="Edit the first name of the user" value={firstNameState} onChange={(event:any) => setFirstName(event.target.value)}/> 
      <UniversalInput text="Edit the surname of the user" value={surnameState} onChange={(event:any) => setSurname(event.target.value)}/> 
      <div className="flex mt-8">
        <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
        <FormButton onClick={handleDeletingUser} className="bg-button_red" text="Delete entry"/>
      </div>
    </UniversalForm>
  )
}