import { useState } from "react"
import { postRequest } from "../src/functions/api/post"
import { SelectColor } from "./formParts"
import clsx from "clsx"
import { Color } from "../src/types"
import { addSingleNote } from "../src/store/actions"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

export const NewNote = () => {

  const [contentState, setContentState] = useState<string>("")
  const [authorState, setAuthorState] = useState<string>("")
  const [colorState, setColorState] = useState<Color>("yellow")
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const getLighterColor = (colorName:"yellow"|"orange"|"red"|"pink"|"purple"|"blue"|"green"|"brown") =>{
    switch (colorName) {
    case "yellow":
      return("bg-[#fff27f]")
    case "orange":
      return("bg-[#ff9966]")
    case "red":
      return("bg-[#ff6666]")
    case "pink":
      return("bg-[#ff99cc]")
    case "purple":
      return("bg-[#cc99ff]")
    case "blue":
      return("bg-[#99ccff]")
    case "green":
      return("bg-[#99ff99]")
    case "brown":
      return("bg-[#cc9966]")
    default:
      return("bg-[#fff27f]")
    }
  }

  const handleContentChange = (event: any) => {
    setContentState(event.target.value)
  }
    
  const handleAuthorChange = (event: any) => {
    setAuthorState(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNote = {
      content: contentState,
      author: authorState,
      color: colorState,
      id:3
    }
    postRequest("note",newNote)
    console.log("Zvládl jsi to Karlíku")
    dispatch(addSingleNote(newNote))
    console.log(newNote)
    setContentState(""),setAuthorState(""),setColorState("yellow")
  }

  return (
    <form onSubmit={handleSubmit} className={clsx("m-1 h-[250px] w-[19%] border border-black p-5",getLighterColor(colorState))}>
      <input 
        className="w-full border border-black bg-transparent"
        placeholder={t("Add_user") as string}
        onChange={handleAuthorChange}
      />
      <br/>
      <input 
        placeholder={t("Add_content") as string}
        className="h-[150px] w-full overflow-scroll border border-black bg-transparent text-left" 
        onChange={handleContentChange}
      />  
      <SelectColor text="Choose from eight different colors" value={colorState} onChange={(event:any)=>{setColorState(event.target.value)}} />
      <button className="rounded-md border border-black" type="submit">Submit</button>
    </form>)
}