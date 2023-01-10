import { useState } from "react"
import { SelectUser } from "../formParts/SelectUser"
import { useDispatch, useSelector } from "react-redux"
import { Language, MinutesSpent, Rating } from "../../src/types"
import { addSingleRecord } from "../../src/store/actions"
import { getEstheticDate,postRequest } from "../../src/functions/index.js"
import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"
import { UniversalForm } from "./UniversalForm"
import { FormButton } from "../formParts/FormButton"
import { UniversalInput, SelectRating, SelectProgrammingLanguage } from "../formParts/index.js"
import clsx from "clsx"
import { IUser } from "../../src/types"
//This form handles sending new post to the database and updating the state

export const AddEntryForm = ({datetime}:{datetime:string})=>{

  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>("Python")
  const [minutes_spent, setMinutesSpent] = useState<MinutesSpent>(1 as MinutesSpent)
  const [rating, setRating] = useState<Rating>(1)
  const [description, setDescription] = useState<string>("")
  const [user, setUser] = useState<string>("")
  const dispatch = useDispatch()
  const users = useSelector((state:any) => state.users)
  const addPostButtonProps = "w-full text-center border-x-2 border-b-2 border-black bg-main_color text-white font-bold"

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const programmer_id = user===""||user==="No user"||user===null?null:(users.find((person:IUser) => person.name === user.substr(0, user.indexOf(" "))).id)
    const data = { datetime, description, programming_language, programmer_id, minutes_spent,rating, id:100 }
    setShowForm(false)
    const toCoPrislo = await postRequest(data,"record")
    dispatch(addSingleRecord(toCoPrislo))
    setProgrammingLanguage("Python"),setMinutesSpent(1 as MinutesSpent),setRating(1),setDescription("")
  }

  return (
    <div>
      {showForm&&
      <UniversalForm closeForm={()=>{setShowForm(false)}} header={<>Create a new entry on day <br/><strong>{getEstheticDate(datetime)}</strong></>} onSubmit={handleSubmit}>
        <div className="w-full">
          <SelectProgrammingLanguage text="programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(event.target.value as Language)} />
          <SelectUser text="Choose the user" value={user} onChange={(event:any)=>setUser(event.target.value)} />
          <UniversalInput type="number" text="Time spent in minutes" extrastyle="h-10" min={true} value={minutes_spent} onChange={(event:any) => setMinutesSpent(Number(event.target.value) as MinutesSpent)}/>
          <SelectRating text="Rating" value={rating} onChange={(event:any) => setRating(parseInt(event.target.value) as Rating)}/>
          <Description text="Your comment" />
          <textarea
            required
            className={inputSameProperties} 
            value={description} 
            onChange={(event) => setDescription(event.target.value)} />
          <div className="flex mt-8">
            <FormButton className="bg-button_green" type="submit" text="Send"/>
          </div>
        </div>
      </UniversalForm>
      }
      {new Date() > new Date(datetime)?
        <button className={clsx(addPostButtonProps,"hover:opacity-80")} onClick={()=>setShowForm(!showForm)}>+</button>
        :
        <div className={addPostButtonProps}>+</div>
      }
    </div>
  )
}