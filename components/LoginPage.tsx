/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { UniversalInput, FormButton  } from "./formParts"
import { sntz } from "../src/functions"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import { setUser } from "../src/store/actions"
import { fakeAdmin, fakeUser } from "../src/constants"

export const LoginPage = ()=>{
  const [username,setFirstName] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [buttonText, setButtonText] = useState<string>("Log in")
  const [buttonColor, setButtonColor] = useState<string>("bg-button_green")
  const dispatch = useDispatch()
  
  const handleAddingUsers = async (event:any)  =>{
    event.preventDefault()
    if(username=="admin"&&password=="123"){
      dispatch(setUser(fakeAdmin))
      /*window.localStorage.setItem(
        "karel", JSON.stringify(true)
      )*/
    }
    else if (username=="user"&&password=="123"){
      dispatch(setUser(fakeUser))
    }
    else {
      console.log("SYBASS")
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

  return(
    <div className={`px-10 lg:px-0 overflow-hidden h-screen overflow-y-scroll w-screen py-[10px] left-0 fixed top-0 h-screen ${""}`}>
      <p className={clsx("m-auto my-10 w-[60%] text-5xl text-center font-bold")}>Welcome to programming <span className={"text-main_color"}>Diary.</span></p>
      <form className={"text-black bg-white p-10 m-auto rounded-xl relative sm:w-[500px] border border-black"} onSubmit={handleAddingUsers}>
        <p className="text-2xl text-center mb-5">Start with loggin in</p>
        <div className="overflow-hidden">
          <UniversalInput required={true} text="Fill in your email adress or username" value={username} onChange={handleUserName} />
          <UniversalInput required={true} text="Fill in your password" value={password} onChange={handlePassword} />
          <div className="flex mt-8">
            <FormButton className={clsx(buttonColor,"duration-500")} type="submit" text={buttonText}/>
          </div>
        </div>
      </form>
    </div>
  )
}