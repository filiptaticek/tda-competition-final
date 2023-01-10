import { useState } from "react"
import { useDispatch } from "react-redux"
import { FormButton } from "../formParts/FormButton"
import { UniversalInput } from "../formParts"
import { UniversalForm } from "./UniversalForm"
import { postRequest } from "../../src/functions/api/post"
import { addSingleUser } from "../../src/store/actions"
import { capitalize, isOnlyLetters } from "../../src/functions"

export const AddUserForm = ()=>{

  const [showForm,setFormShown] = useState<boolean>(false)
  const [name,setFirstName] = useState<string>("")
  const [surname,setSurname] = useState<string>("")
  const dispatch = useDispatch()

  const handleAddingUsers = async (event:any)  =>{
    event?.preventDefault()
    setFormShown(false)
    const toCoPrislo = await postRequest({name,surname,id:1},"programmer")
    dispatch(addSingleUser(toCoPrislo))
    setFirstName(""),setSurname("")
  }

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

  return(
    <>
      <div className="flex mb-2">
        <FormButton className="bg-main_color w-[150px] m-auto" onClick={()=>setFormShown(true)} text="Add users" />
      </div>
      {showForm&&
      <UniversalForm header="Add new user" closeForm={()=>setFormShown(false)} onSubmit={handleAddingUsers}>
        <UniversalInput text="Fill in the first name with only one word" value={name} onChange={handleFirstName} />
        <UniversalInput text="Fill in the surname with only one word" value={surname} onChange={handleSurname} />
        <div className="flex mt-8">
          <FormButton className="bg-button_green" type="submit" text="Add the user"/>
        </div>
      </UniversalForm>
      }
    </>
  )
}