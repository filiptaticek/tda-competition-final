/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Language, MinutesSpent, Rating, ITag } from "../../src/types"
import { removeSingleRecord, updateSingleRecord } from "../../src/store/actions"
import { getEstheticDate, deleteRequest, putRequest,sntz } from "../../src/functions/index.js"
import { Description } from "../Description"
import { UniversalForm } from "./UniversalForm"
import { UniversalInput, SelectRating, SelectProgrammingLanguage,FormButton } from "../formParts"
import { inputSameProperties } from "../../src/constants"

interface IEditEntryForm {
    datetime:string,
    postProgrammingLanguage:Language
    postMinutesSpent:MinutesSpent
    postRating:Rating
    postComment:string
    postId:number
    postProgrammerId:null|number
    postTagIds:number[]
}

export const EditEntryForm = ({postId,datetime,postProgrammingLanguage,postMinutesSpent,postRating, postComment}:IEditEntryForm)=>{

  const mode = useSelector((state:any) => state.mode)
  const tags = useSelector((state:any) => state.tags)
  const user = useSelector((state:any) => state.user)
  const token = useSelector((state:any) => state.token)
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>(postProgrammingLanguage)
  const [minutes_spent, setMinutesSpent] = useState<MinutesSpent>(postMinutesSpent)
  const [rating, setRating] = useState<Rating>(postRating)
  const [description, setDescription] = useState<string>(postComment)
  const [picked, setPicked] = useState<any>([])

  const handleTags = (tag:ITag) => {
    if (picked.includes(tag)) {
      setPicked(picked.filter((thing:ITag) => thing.name !== tag.name))}
    else {
      setPicked([...picked, tag])
    }
  }

  const handleEditingEntry = (event:any) => {
    event.preventDefault()
    const id = postId
    const tag_ids = picked.map((obj:any) => obj.id)
    const data = { datetime, description, programming_language, minutes_spent, rating, id, programmer_id:user.id, tag_ids }
    putRequest("record",postId,data, token)
    dispatch(updateSingleRecord(postId,data))
    setShowForm(false)
  }

  const handleDeletingEntry = ()=>{
    event?.preventDefault()
    deleteRequest("record",postId,token)
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
              <SelectProgrammingLanguage text="Programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(sntz(event.target.value as Language))}/>
              <UniversalInput required type="number" text="Time spent in minutes" min={1} value={minutes_spent} onChange={(event:any) => setMinutesSpent(sntz(Number(event.target.value) as MinutesSpent))} extrastyle="h-10" /> 
              <SelectRating value={rating} onChange={(event:any) => setRating(sntz(parseInt(event.target.value) as Rating))} text="Rating"/>
              <Description text="Pick the tags for your entry" />
              <div className={inputSameProperties}>
                {tags.map((tag: ITag) => (
                  <div key={tag.id}>
                    <input
                      type="checkbox"
                      value={tag.name}
                      checked={picked.includes(tag)}
                      onChange={() => handleTags(tag)}
                    />
                    <span className="ml-4">{tag.name}</span>
                  </div>
                ))}
              </div>
              <Description text="Your comment" />
              <textarea required className={inputSameProperties} value={description} onChange={(event) => setDescription(sntz(event.target.value))} />
              <div className="flex mt-2">
                <FormButton type="submit" text="Edit form" className="mr-2 bg-button_green" />
                <FormButton onClick={handleDeletingEntry} className="bg-button_red" text="Delete"/>
              </div>
            </div>
          </UniversalForm>
      }
      {mode?
        <img src="upravit_zaznam_bily.png" className="h-[30px] m-auto" onClick={handleOpeningForm}/>
        :
        <img src="upravit_zaznam.png" className="h-[30px] m-auto" onClick={handleOpeningForm}/>
      }
    </div>
  )
}