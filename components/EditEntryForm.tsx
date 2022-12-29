/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import clsx from "clsx"
import { Language, Rating } from "../src/types"
import { useDispatch } from "react-redux"
import { removeSingleRecord, updateSingleRecord } from "../src/store/actions"
import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { deleteRequest } from "../src/functions/api/delete"
import { putRequest } from "../src/functions/api/put"

interface IEditEntryForm {
    postDate:string,
    postProgrammingLanguage:Language
    postMinutesSpent:number
    postRating:Rating
    postComment:string
    postId:number
}

export const EditEntryForm = ({postId,postDate,postProgrammingLanguage,postMinutesSpent,postRating,postComment}:IEditEntryForm)=>{

  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>(postProgrammingLanguage)
  const [minutes_spent, setMinutesSpent] = useState<number>(postMinutesSpent)
  const [rating, setRating] = useState<Rating>(postRating)
  const [description, setDescription] = useState<string>(postComment)
  const dispatch = useDispatch()

  const handleEditingEntry = (event:any) => {
    event.preventDefault()
    const date = postDate
    const record_id = 1000
    const data = { date, description, programming_language, minutes_spent, rating,record_id }
    putRequest(postId,data)
    dispatch(updateSingleRecord(postId,data))
    setShowForm(false)
  }

  const handleDeletingEntry = ()=>{
    deleteRequest(postId)
    setShowForm(false)
    dispatch(removeSingleRecord(postId))
  }

  const sameProperties ="w-full my-[4px] rounded-md border border-black p-2 m-auto"
  const Description = ({text}:{text:string})=>{
    return(
      <span className="font-bold text-sm">
        {text}
      </span>
    )
  }

  return (
    <div>
      {showForm&&
        <div className="w-screen left-0 fixed top-0 h-screen bg-black/80">
          <form className="text-left p-10 m-auto rounded-xl relative top-[120px] bg-white w-[500px] border border-black" onSubmit={handleEditingEntry}>
            <p className="text-2xl text-center mb-5">Edit your entry from<br/> <strong>{getEstheticDate(postDate)}</strong></p>
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
                <button className="w-[50%] bg-emerald-200 px-5 py-2 rounded-md border border-black font-bold" type="submit">Update </button>
                <button type="button" className="w-[50%] bg-red-200 rounded-md border border-black w-full font-bold" onClick={()=>setShowForm(!showForm)}>Close</button>
              </div>
              <button type="button" className="w-[50%] bg-emerald-200 px-5 py-2 rounded-md border border-black font-bold" onClick={handleDeletingEntry}>Delete </button>
            </div>
          </form>
        </div>
      }
      <img src="upravit_zaznam.png" className="h-[20px] m-auto cursor-pointer mt-3 w-min h-min" onClick={()=>setShowForm(!showForm)}/>
    </div>
  )
}