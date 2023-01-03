/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Language, MinutesSpent, Rating } from "../src/types"
import { removeSingleRecord, updateSingleRecord } from "../src/store/actions"
import { getEstheticDate, deleteRequest, putRequest } from "../src/functions/index.js"
import { Description } from "./Description"
import { inputSameProperties } from "../src/constants"
import { UniversalForm } from "./UniversalForm"
import { FormButton } from "./FormButton"
import { UniversalInput, SelectRating, SelectProgrammingLanguage } from "./formParts/index.js"

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
    const record_id = 1
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
    <>
      {showForm&&
          <UniversalForm closeForm={()=>setShowForm(!showForm)} header={<p>Edit your entry from <br/><strong>{getEstheticDate(date)}</strong></p>} onSubmit={handleEditingEntry}>
            <div className="w-full text-left">
              <SelectProgrammingLanguage text="Programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(event.target.value as Language)}/>
              <UniversalInput type="number" text="Time spent in minutes" min={true} value={minutes_spent} onChange={(event:any) => setMinutesSpent(Number(event.target.value) as MinutesSpent)} extrastyle="h-10" /> 
              <SelectRating value={rating} onChange={(event:any) => setRating(parseInt(event.target.value) as Rating)} text="Rating"/>
              <Description text="Your comment" />
              <textarea required className={inputSameProperties} value={description} onChange={(event) => setDescription(event.target.value)} />
              <div className="flex mt-8">
                <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
                <FormButton onClick={handleDeletingEntry} className="bg-button_red" text="Delete entry"/>
              </div>
            </div>
          </UniversalForm>
      }
      <img src="upravit_zaznam.png" className="h-[20px] m-auto cursor-pointer mt-3 w-min h-min" onClick={()=>setShowForm(!showForm)}/>
    </>
  )
}