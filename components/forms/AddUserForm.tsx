import { useState } from "react"
import { useDispatch } from "react-redux"
import { UniversalInput,FormButton } from "../formParts"
import { UniversalForm } from "./UniversalForm"
import { addSingleUser } from "../../src/store/actions"
import { sntz,capitalize, isOnlyLetters,postRequest } from "../../src/functions"

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
      setFirstName(sntz(capitalize(word)))
    }
  }
  const handleSurname = (event:any) => {
    const word = event.target.value
    if (isOnlyLetters(word)){
      setSurname(sntz(capitalize(word)))
    }
  }

  return(
    <>
      <div className="flex m-auto w-[300px] mb-2">
        <FormButton className="bg-main_color w-min m-auto" onClick={()=>setFormShown(true)} text="Add users" />
      </div>
      {showForm&&
      <UniversalForm className="pt-[150px]" header="Add new user" closeForm={()=>setFormShown(false)} onSubmit={handleAddingUsers}>
        <UniversalInput required={true} text="Fill in the first name with only one word" value={name} onChange={handleFirstName} />
        <UniversalInput required={true} text="Fill in the surname with only one word" value={surname} onChange={handleSurname} />
        <div className="flex mt-8">
          <FormButton className="bg-button_green" type="submit" text="Add the user"/>
        </div>
      </UniversalForm>
      }
    </>
  )
}