import { useState } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"
import { postRequest } from "../src/functions/api/post"
import { Language, Rating } from "../src/types"
import { addSingleRecord } from "../src/store/actions"
import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { Description } from "./Description"
import { designColor } from "../src/constants"
//This form handles sending new post to the database and updating the state

export const AddEntryForm = ({date}:{date:string})=>{

  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>("Python")
  const [minutes_spent, setMinutesSpent] = useState<number>(0)
  const [rating, setRating] = useState<Rating>(0)
  const [description, setDescription] = useState<string>("")
  const dispatch = useDispatch()

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const record_id = 100
    const data = { date, description, programming_language, minutes_spent, rating, record_id }
    setShowForm(false)
    const toCoPrislo = await postRequest(data)
    dispatch(addSingleRecord(toCoPrislo))
    setProgrammingLanguage("Python"),setMinutesSpent(0),setRating(0),setDescription("")
  }

  const sameProperties ="w-full my-[4px] rounded-md border border-black p-2 m-auto"

  return (
    <div>
      {showForm&&
        <div className="w-screen left-0 fixed top-0 h-screen bg-black/80">
          <form className="p-10 m-auto rounded-xl relative top-[120px] bg-white w-[500px] border border-black" onSubmit={handleSubmit}>
            <p className="text-2xl text-center mb-5">New entry from<br/> <strong>{getEstheticDate(date)}</strong></p>
            <div className="w-full">
              <Description text="Programming language" />
              <select 
                className={sameProperties} 
                value={programming_language} 
                onChange={(event) => setProgrammingLanguage(event.target.value as Language)}>
                <option value="Python">Python</option>
                <option value="Javascript">Javascript</option>
                <option value="C++">C++</option>
              </select>
              <br/>
              <Description text="Time spent in minutes" />
              <input 
                className={clsx(sameProperties,"h-10")} 
                type="number"
                value={minutes_spent} 
                onChange={(event) => setMinutesSpent(Number(event.target.value))} 
              />
              <br/>
              <Description text="Rating" />
              <br/>
              <select 
                className={sameProperties} 
                value={rating} 
                onChange={(event) => setRating(parseInt(event.target.value) as Rating)}>
                <option value={0} >0</option>
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
                className={sameProperties} 
                value={description} 
                onChange={(event) => setDescription(event.target.value)} />
              <br/>
              <div className="flex mt-8">
                <button 
                  className="bg-emerald-200 w-[50%] px-5 py-2 rounded-md border border-black font-bold" 
                  type="submit">
                Send
                </button>
                <button className="bg-red-200 w-[50%] rounded-md ml-4 border border-black w-full font-bold" onClick={()=>setShowForm(!showForm)}>Close</button>
              </div>
            </div>
          </form>
        </div>
      }
      {new Date() > new Date(date)?
        <button className={`w-full text-center border-x-2 border-b-2 border-black ${designColor} text-white font-bold" onClick={()=>setShowForm(!showForm)}`}>+</button>
        :
        <div className={`w-full text-center border-x-2 border-b-2 border-black ${designColor} text-white font-bold`}>+</div>
      }
    </div>
  )
}