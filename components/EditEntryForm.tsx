/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"
import { Language, MinutesSpent, Rating } from "../src/types"
import { removeSingleRecord, updateSingleRecord } from "../src/store/actions"
import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { deleteRequest } from "../src/functions/api/delete"
import { putRequest } from "../src/functions/api/put"
import { Description } from "./Description"
import { inputSameProperties } from "../src/constants"
import { UniversalForm } from "./UniversalForm"
import { FormButton } from "./FormButton"

interface IEditEntryForm {
    date:string,
    postProgrammingLanguage:Language
    postMinutesSpent:MinutesSpent
    postRating:Rating
    postComment:string
    postId:number
}

export const EditEntryForm = ({postId,date,postProgrammingLanguage,postMinutesSpent,postRating,postComment}:IEditEntryForm)=>{

  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>(postProgrammingLanguage)
  const [minutes_spent, setMinutesSpent] = useState<MinutesSpent>(postMinutesSpent)
  const [rating, setRating] = useState<Rating>(postRating)
  const [description, setDescription] = useState<string>(postComment)
  const dispatch = useDispatch()

  const handleEditingEntry = (event:any) => {
    event.preventDefault()
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

  return (
    <div>
      {showForm&&
          <UniversalForm closeForm={()=>setShowForm(!showForm)} header={<p>Edit your entry from <br/><strong>{getEstheticDate(date)}</strong></p>} onSubmit={handleEditingEntry}>
            <div className="w-full text-left">
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
                <FormButton type="submit" text="Edit form" className="mr-2 bg-emerald-200" />
                <FormButton onClick={handleDeletingEntry} className="bg-red-500" text="Delete entry"/>
              </div>
            </div>
          </UniversalForm>
      }
      <img src="upravit_zaznam.png" className="h-[20px] m-auto cursor-pointer mt-3 w-min h-min" onClick={()=>setShowForm(!showForm)}/>
    </div>
  )
}