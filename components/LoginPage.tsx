/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"

import clsx from "clsx"
import { useDispatch } from "react-redux"

import { postRequest, sntz } from "../src/functions"
import { setToken, setUser } from "../src/store/actions"
import { FormButton, UniversalInput } from "./formParts"
import { SelectYesNo } from "./formParts/SelectYesNo"
import { Page } from "./Page"

export const LoginPage = () => {
  const [username, setFirstName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [remember, setRemember] = useState<string>("Yes")
  const [buttonText, setButtonText] = useState<string>("Log in")
  const [buttonColor, setButtonColor] = useState<string>("bg-button_green")
  const dispatch = useDispatch()

  const handleAddingUsers = async (event: any) => {
    event.preventDefault()
    try{
      const prihlaseni = await postRequest({ login: username, password }, "login")
      if (prihlaseni) {
        remember == "Yes" && window.localStorage.setItem("loggedNoteappUser", JSON.stringify(prihlaseni))
        dispatch(setUser(prihlaseni.user))
        dispatch(setToken(prihlaseni.token))
      }
    } 
    catch(error) {
      setButtonText("Wrong credentials")
      setButtonColor("bg-button_red")
      setTimeout(() => {
        setButtonText("Log in "), setButtonColor("bg-button_green")
      }, 3000)
    }
  }

  const handleUserName = (event: any) => {const word = event.target.value;setFirstName(sntz(word))}
  const handlePassword = (event: any) => {const word = event.target.value;setPassword(sntz(word))}
  const handleRemember = () => {setRemember(remember == "Yes" ? "No" : "Yes")}

  return (
    <Page>
      <header>
        <title>Programming Diary | Login</title>
      </header>
      <p className={clsx("m-auto my-10 text-center text-5xl font-bold sm:w-[60%]")}>
        Welcome to programming <span className={"text-light_blue"}>Diary.</span>
      </p>
      <form className={"relative m-auto rounded-xl border border-black bg-white p-10 text-black sm:w-[500px]"} onSubmit={handleAddingUsers}>
        <p className="mb-5 text-center text-2xl">Start with loggin in</p>
        <div className="overflow-hidden">
          <UniversalInput required={true} text="Fill in your email adress or username" value={username} onChange={handleUserName} />
          <UniversalInput type="password" required={true} text="Fill in your password" value={password} onChange={handlePassword} />
          <SelectYesNo text="Would you like to remember the credentials?" value={remember} onChange={handleRemember} />
          <div className="mt-8 flex">
            <FormButton className={clsx(buttonColor, "duration-500")} type="submit" text={buttonText} />
          </div>
        </div>
      </form>
    </Page>
  )
}
