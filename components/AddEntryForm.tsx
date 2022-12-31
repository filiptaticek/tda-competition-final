import { useState } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"
import { postRequest } from "../src/functions/api/post"
import { Language, MinutesSpent, Rating } from "../src/types"
import { addSingleRecord } from "../src/store/actions"
import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { Description } from "./Description"
import { designColor, inputSameProperties } from "../src/constants"
import { UniversalForm } from "./UniversalForm"
import { FormButton } from "./FormButton"
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
    const toCoPrislo = await postRequest(data)
    dispatch(addSingleRecord(toCoPrislo))
    setProgrammingLanguage("Python"),setMinutesSpent(1 as MinutesSpent),setRating(1),setDescription("")
  }

  return (
    <div>
      {showForm&&
      <UniversalForm closeForm={()=>{setShowForm(false)}} header={<p>Create a new entry on day <br/><strong>{getEstheticDate(date)}</strong></p>} onSubmit={handleSubmit}>
        <div className="w-full">
          <Description text="Programming language" />
          <select 
            className={inputSameProperties} 
            value={programming_language} 
            onChange={(event) => setProgrammingLanguage(event.target.value as Language)}>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
            <option value="C++">C++</option>
          </select>
          <br/>
          <Description text="Time spent in minutes" />
          <input 
            className={clsx(inputSameProperties,"h-10")} 
            type="number"
            min="1"
            value={minutes_spent} 
            onChange={(event) => setMinutesSpent(Number(event.target.value) as MinutesSpent)} 
          />
          <br/>
          <Description text="Rating" />
          <br/>
          <select 
            className={inputSameProperties} 
            value={rating} 
            onChange={(event) => setRating(parseInt(event.target.value) as Rating)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br />
          <Description text="Your comment" />
          <br />
          <textarea
            className={inputSameProperties} 
            value={description} 
            onChange={(event) => setDescription(event.target.value)} />
          <br/>
          <div className="flex mt-8">
            <FormButton className="bg-emerald-200" type="submit" text="Send"/>
          </div>
        </div>
      </UniversalForm>
      }
      {new Date() > new Date(date)?
        <button className={`w-full text-center border-x-2 border-b-2 border-black ${designColor} text-white font-bold`} onClick={()=>setShowForm(!showForm)}>+</button>
        :
        <div className={`w-full text-center border-x-2 border-b-2 border-black ${designColor} text-white font-bold`}>+</div>
      }
    </div>
  )
}