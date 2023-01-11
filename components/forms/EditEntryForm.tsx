/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Language, MinutesSpent, Rating } from "../../src/types"
import { removeSingleRecord, updateSingleRecord } from "../../src/store/actions"
import { getEstheticDate, deleteRequest, putRequest } from "../../src/functions/index.js"
import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"
import { UniversalForm } from "./UniversalForm"
import { FormButton } from "../formParts/FormButton"
import { UniversalInput, SelectRating, SelectProgrammingLanguage } from "../formParts/index.js"
import { SelectUser } from "../formParts/SelectUser"
import { IUser } from "../../src/types"

interface IEditEntryForm {
    datetime:string,
    postProgrammingLanguage:Language
    postMinutesSpent:MinutesSpent
    postRating:Rating
    postComment:string
    postId:number
    postProgrammerId:null|number
}

export const EditEntryForm = ({postId,datetime,postProgrammingLanguage,postMinutesSpent,postRating, postComment}:IEditEntryForm)=>{

  const users = useSelector((state:any) => state.users)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>(postProgrammingLanguage)
  const [minutes_spent, setMinutesSpent] = useState<MinutesSpent>(postMinutesSpent)
  const [rating, setRating] = useState<Rating>(postRating)
  const [description, setDescription] = useState<string>(postComment)
  const dispatch = useDispatch()
  const [user, setUser] = useState<string>("Actual user")

  const handleEditingEntry = (event:any) => {
    event.preventDefault()
    const id = postId
    const programmer_id = (user==="Actual user")?"Dont change the user"
      :
      (user==="No user")?null
        :
        users.find((person:IUser) => person.name === user.substr(0, user.indexOf(" "))).id
    const data = programmer_id==="Dont change the user"?
      { datetime, description, programming_language, minutes_spent, rating, id }
      :
      { datetime, description, programming_language, minutes_spent, rating, id, programmer_id }
    putRequest("record",postId,data)
    programmer_id!=="Dont change the user"&&dispatch(updateSingleRecord(postId,data))
    setShowForm(false)
  }

  const handleDeletingEntry = ()=>{
    event?.preventDefault()
    deleteRequest("record",postId)
    dispatch(removeSingleRecord(postId))
    setShowForm(false)
  }

  const handleOpeningForm = (event:any) =>{
    event.stopPropagation()
    setShowForm(true)
  }

  return (
    <div onClick={(event)=>{event.stopPropagation()}}>
      {showForm&&
          <UniversalForm closeForm={()=>setShowForm(!showForm)} header={<>Edit your entry from <br/><strong>{getEstheticDate(datetime)}</strong></>} onSubmit={handleEditingEntry}>
            <div className="w-full text-left">
              <SelectProgrammingLanguage text="Programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(event.target.value as Language)}/>
              <SelectUser actualUser={true} text="Choose the user" value={user} onChange={(event:any)=>setUser(event.target.value)} />
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
      <img src="upravit_zaznam.png" className="h-[30px] m-auto cursor-pointer mt-1 w-min h-min" onClick={handleOpeningForm}/>
    </div>
  )
}