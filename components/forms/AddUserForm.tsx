import { useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { UniversalInput,FormButton, SelectYesNo } from "../formParts"
import { UniversalForm } from "./UniversalForm"
import { addSingleUser } from "../../src/store/actions"
import { sntz,capitalize, isOnlyLetters,postRequest } from "../../src/functions"
import clsx from "clsx"
import { State } from "../../src/types"

export const AddUserForm = ()=>{

  const { mode, token } = useSelector((state: State) => state)
  const [buttonText, setButtonText] = useState<string>("Add user")
  const [buttonColor, setButtonColor] = useState<string>("bg-button_green")
  const [showForm,setFormShown] = useState<boolean>(false)
  const [name,setFirstName] = useState<string>("")
  const [surname,setSurname] = useState<string>("")
  const [username,setUsername] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [admin, setAdmin] = useState<string>("No")
  const dispatch = useDispatch()

  const handleAddingUsers = async (event:any)  =>{
    event?.preventDefault()
    const nasObjekt = {name,surname,id:1,username,email,password,admin:admin=="Yes"?true:false}
    const toCoPrislo = await postRequest(nasObjekt,"programmer", token)
    if (toCoPrislo){
      dispatch(addSingleUser(toCoPrislo)) 
      setFormShown(false)
      setFirstName(""),setSurname(""),setUsername(""),setEmail(""),setPassword(""),setAdmin("No")
    }
    else {
      setButtonText("This email or username are already in use")
      setButtonColor("bg-button_red")
      setTimeout(() => {setButtonText("Log in "),setButtonColor("bg-button_green")}, 3000)
    }
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
  const handleUsername = (event:any) => {
    const word = event.target.value
    setUsername(sntz(word))
  }

  const handleEmail = (event:any) => {
    const word = event.target.value
    setEmail(sntz(word))
  }

  const handlePassword = (event:any) => {
    const word = event.target.value
    setPassword(sntz(word))
  }

  const handleAdmin = () => {
    setAdmin(admin==="Yes"?"No":"Yes")
  }

  return(
    <>
      <div className="m-auto mb-8 flex w-[300px] lg:mb-2">
        <FormButton className={`${mode?"bg-white text-main_color":"bg-main_color text-white"} m-auto`} onClick={()=>setFormShown(true)} text="Add users" />
      </div>
      {showForm&&
      <UniversalForm className="pt-[60px]" header="Add new user" closeForm={()=>setFormShown(false)} onSubmit={handleAddingUsers}>
        <UniversalInput required={true} text="Fill in the first name" value={name} onChange={handleFirstName} />
        <UniversalInput required={true} text="Fill in the surname" value={surname} onChange={handleSurname} />
        <UniversalInput required={true} text="Fill in the username" value={username} onChange={handleUsername} />
        <UniversalInput required={true} text="Fill in the email" value={email} onChange={handleEmail} />
        <UniversalInput type="password" required={true} text="Fill in the password" value={password} onChange={handlePassword} />
        <SelectYesNo text="Is the user admin?" value={admin} onChange={handleAdmin} />
        <div className="mt-8 flex">
          <FormButton className={clsx(buttonColor,"duration-500")} type="submit" text={buttonText}/>
        </div>
      </UniversalForm>
      }
    </>
  )
}