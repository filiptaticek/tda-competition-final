import { useState } from "react"
import { useDispatch } from "react-redux"
import { Language, MinutesSpent, Rating } from "../../src/types"
import { addSingleRecord } from "../../src/store/actions"
import { getEstheticDate,postRequest } from "../../src/functions/index.js"
import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"
import { UniversalForm } from "./UniversalForm"
import { FormButton } from "../formParts/FormButton"
import { UniversalInput, SelectRating, SelectProgrammingLanguage } from "../formParts/index.js"
//This form handles sending new post to the database and updating the state

export const AddEntryForm = ({date}:{date:string})=>{

  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>("Python")
  const [minutes_spent, setMinutesSpent] = useState<MinutesSpent>(1 as MinutesSpent)
  const [rating, setRating] = useState<Rating>(1)
  const [description, setDescription] = useState<string>("")
  const dispatch = useDispatch()

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const record_id = 100
    const data = { date, description, programming_language, minutes_spent, rating, record_id }
    setShowForm(false)
    const toCoPrislo = await postRequest(data,"record")
    dispatch(addSingleRecord(toCoPrislo))
    setProgrammingLanguage("Python"),setMinutesSpent(1 as MinutesSpent),setRating(1),setDescription("")
  }

  return (
    <div>
      {showForm&&
      <UniversalForm closeForm={()=>{setShowForm(false)}} header={<>Create a new entry on day <br/><strong>{getEstheticDate(date)}</strong></>} onSubmit={handleSubmit}>
        <div className="w-full">
          <SelectProgrammingLanguage text="programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(event.target.value as Language)} />
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
      {new Date() > new Date(date)?
        <button className={"w-full text-center border-x-2 border-b-2 border-black bg-main_color text-white font-bold"} onClick={()=>setShowForm(!showForm)}>+</button>
        :
        <div className={"w-full text-center border-x-2 border-b-2 border-black bg-main_color text-white font-bold"}>+</div>
      }
    </div>
  )
}