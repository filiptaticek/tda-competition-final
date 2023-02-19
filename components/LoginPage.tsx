/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { UniversalInput, FormButton  } from "./formParts"
import { postRequest, sntz } from "../src/functions"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { setUser } from "../src/store/actions"
import { setToken } from "../src/store/actions"
import { SelectYesNo } from "./formParts/SelectYesNo"

export const LoginPage = ()=>{
  const [username,setFirstName] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [remember,setRemember] = useState<string>("Yes")
  const [buttonText, setButtonText] = useState<string>("Log in")
  const [buttonColor, setButtonColor] = useState<string>("bg-button_green")
  const dispatch = useDispatch()
  
  const handleAddingUsers = async (event:any)  =>{
    event.preventDefault()
    const prihlaseni = await postRequest({login:username,password},"login")
    if (prihlaseni) {
      remember=="Yes"&&window.localStorage.setItem(
        "loggedNoteappUser", JSON.stringify(prihlaseni)
      )
      dispatch(setUser(prihlaseni.user))
      dispatch(setToken(prihlaseni.token))
      console.log(prihlaseni.token)
    }
    else
    {
      setButtonText("Wrong credentials")
      setButtonColor("bg-button_red")
      setTimeout(() => {setButtonText("Log in "),setButtonColor("bg-button_green")}, 1000)
    }
  }
  
  const handleUserName = (event:any) => {
    const word = event.target.value
    setFirstName(sntz(word))
  }
  
  const handlePassword = (event:any) => {
    const word = event.target.value
    setPassword(sntz(word))
  }
  
  const handleRemember = (event:any) => {
    const word = event.target.value
    setRemember(sntz(word))
  }

  return(
    <div className={`px-10 lg:px-0 overflow-hidden h-screen overflow-y-scroll w-screen py-[10px] left-0 fixed top-0 h-screen ${""}`}>
      <p className={clsx("m-auto my-10 w-[60%] text-5xl text-center font-bold")}>Welcome to programming <span className={"text-main_color"}>Diary.</span></p>
      <form className={"text-black bg-white p-10 m-auto rounded-xl relative sm:w-[500px] border border-black"} onSubmit={handleAddingUsers}>
        <p className="text-2xl text-center mb-5">Start with loggin in</p>
        <div className="overflow-hidden">
          <UniversalInput required={true} text="Fill in your email adress or username" value={username} onChange={handleUserName} />
          <UniversalInput type="password" required={true} text="Fill in your password" value={password} onChange={handlePassword} />
          <SelectYesNo text="Would you like to remember the credentials?" value={remember} onChange={handleRemember} />
          <div className="flex mt-8">
            <FormButton className={clsx(buttonColor,"duration-500")} type="submit" text={buttonText}/>
          </div>
        </div>
      </form>
    </div>
  )
}