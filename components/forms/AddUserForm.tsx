import { useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { UniversalInput,FormButton } from "../formParts"
import { UniversalForm } from "./UniversalForm"
import { addSingleUser } from "../../src/store/actions"
import { sntz,capitalize, isOnlyLetters,postRequest } from "../../src/functions"
import { SelectYesNo } from "../formParts/SelectYesNo"
import clsx from "clsx"

export const AddUserForm = ()=>{

  const mode = useSelector((state:any) => state.mode)
  const token = useSelector((state:any) => state.token)
  const [buttonText, setButtonText] = useState<string>("Log in")
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
    console.log(nasObjekt)
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
      <div className="flex m-auto w-[300px] mb-8 lg:mb-2">
        <FormButton className={`${mode?"text-main_color bg-white":"text-white bg-main_color"} m-auto`} onClick={()=>setFormShown(true)} text="Add users" />
      </div>
      {showForm&&
      <UniversalForm className="pt-[60px]" header="Add new user" closeForm={()=>setFormShown(false)} onSubmit={handleAddingUsers}>
        <UniversalInput required={true} text="Fill in the first name" value={name} onChange={handleFirstName} />
        <UniversalInput required={true} text="Fill in the surname" value={surname} onChange={handleSurname} />
        <UniversalInput required={true} text="Fill in the username" value={username} onChange={handleUsername} />
        <UniversalInput required={true} text="Fill in the email" value={email} onChange={handleEmail} />
        <UniversalInput type="password" required={true} text="Fill in the password" value={password} onChange={handlePassword} />
        <SelectYesNo text="Is the user admin?" value={admin} onChange={handleAdmin} />
        <div className="flex mt-8">
          <FormButton className={clsx(buttonColor,"duration-500")} type="submit" text={buttonText}/>
        </div>
      </UniversalForm>
      }
    </>
  )
}