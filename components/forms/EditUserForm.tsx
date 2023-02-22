import { UniversalForm } from "./UniversalForm"
import { useDispatch, useSelector } from "react-redux"
import { removeSingleUser, updateSingleUser, setUser } from "../../src/store/actions"
import { useState } from "react"
import { putRequest,capitalize, deleteRequest, isOnlyLetters, sntz } from "../../src/functions"
import { UniversalInput, FormButton } from "../formParts"
import { SelectYesNo } from "../formParts/SelectYesNo"
import { IUser } from "../../src/types"

export const EditUserForm = ({closeForm,id,name,surname, email, username, admin}:IUser&{closeForm:any})=>{

  const dispatch = useDispatch()
  const [nameState, setName] = useState<string>(name)
  const [surnameState, setSurname] = useState<string>(surname)
  const [usernameState,setUsername] = useState<string>(username)
  const [emailState,setEmail] = useState<string>(email)
  const [passwordState,setPassword] = useState<string>("")
  const [adminState, setAdmin] = useState<string>(admin?"Yes":"No")
  const token = useSelector((state:any) => state.token)
  const user = useSelector((state:any) => state.user)

  const handleFirstName = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setName(capitalize(word))
    }
  }

  const handleSurname = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setSurname(capitalize(word))
    }
  }
  const handleUsername = (event:any) => {
    setUsername(sntz(event.target.value))
  }

  const handleEmail = (event:any) => {
    setEmail(sntz(event.target.value))
  }

  const handlePassword = (event:any) => {
    setPassword(sntz(event.target.value))
  }

  const handleAdmin = () => {
    setAdmin(adminState=="Yes"?"No":"Yes")
  }
  
  const handleEditingUser = (event:any)=>{
    event?.preventDefault()
    const updatedProgrammer = {
      name:nameState,
      surname:surnameState,
      email:emailState,
      username:usernameState,
      admin:adminState=="Yes"?true:false,
      id:id,
      password:passwordState===""?null:passwordState
    }
    putRequest("programmer",id,updatedProgrammer,token)
    dispatch(updateSingleUser(id,updatedProgrammer))
    id==user.id&&dispatch(setUser(updatedProgrammer))
    closeForm()
  }

  const handleDeletingUser = (event:any)=>{
    event?.preventDefault()
    deleteRequest("programmer",id,token)
    dispatch(removeSingleUser(id))
    closeForm()
  }

  return(
    <UniversalForm className="pt-[60px]" header={<>Edit user <strong> {name} {surname}</strong></>} onSubmit={handleEditingUser} closeForm={closeForm}>
      <UniversalInput text="Edit the first name of the user" value={nameState} onChange={handleFirstName}/> 
      <UniversalInput text="Edit the surname of the user" value={surnameState} onChange={handleSurname}/> 
      <UniversalInput required={true} text="Fill in the username" value={usernameState} onChange={handleUsername} />
      <UniversalInput required={true} text="Fill in the email" value={emailState} onChange={handleEmail} />
      <UniversalInput type="password" text="Fill in new password if you wish to change it" value={passwordState} onChange={handlePassword} />
      <SelectYesNo text="Is the user admin?" value={adminState} onChange={handleAdmin} />
      <div className="flex mt-8">
        <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
        <FormButton onClick={handleDeletingUser} className="bg-button_red" text="Delete"/>
      </div>
    </UniversalForm>
  )
}