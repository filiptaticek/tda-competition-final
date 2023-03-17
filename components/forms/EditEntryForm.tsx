/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { MinutesSpent, Rating, ITag, State } from "../../src/types"
import { removeSingleRecord, updateSingleRecord } from "../../src/store/actions"
import { deleteRequest, getEstheticDate,sntz, putRequest, capitalize } from "../../src/functions/index.js"
import { Description } from "../Description"
import { UniversalForm } from "./UniversalForm"
import { UniversalInput, SelectRating, SelectProgrammingLanguage,FormButton } from "../formParts"
import { inputSameProperties } from "../../src/constants"
import { FieldsRequired } from "../formParts/FieldsRequired"

interface IEditEntryForm {
    date:string,
    postProgrammingLanguage:string
    postMinutesSpent:MinutesSpent
    postRating:Rating
    postComment:string
    postId:number
    postProgrammerId:null|number
    postTagIds:number[]
}

export const EditEntryForm = ({postId,date,postProgrammingLanguage,postMinutesSpent,postRating, postComment, postTagIds}:IEditEntryForm)=>{

  const dispatch = useDispatch()
  const { mode, tags, user, token } = useSelector((state: State) => state)
  const [showForm, setShowForm] = useState<boolean>(false)
  const pPL = postProgrammingLanguage 
  const [programming_language, setProgrammingLanguage] = useState<string>(pPL=="Python"?"Python":pPL=="Javascript"?"Javascript":pPL=="C++"?"C++":"")
  const [own_language, setOwnLanguage] = useState<string>(pPL=="Python"?"":pPL=="Javascript"?"":pPL=="C++"?"":pPL)
  const [time_spent, setMinutesSpent] = useState<MinutesSpent>(postMinutesSpent)
  const [rating, setRating] = useState<Rating>(postRating)
  const [description, setDescription] = useState<string>(postComment)
  const [picked, setPicked] = useState<any>([])

  useEffect(() => {
    const setInitialPicked = ()=>setTimeout(() => {
      if(tags) {
        const filteredTags = postTagIds?tags.filter((tag:ITag) => postTagIds.includes(tag.id)):[]
        setPicked(filteredTags)
      }
    }, 5)
    setInitialPicked()
  }, [postTagIds, tags])

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
    const data = { date, description, programming_language:programming_language!=="Python"&&programming_language!=="Javascript"&&programming_language!=="C++"?own_language:programming_language, time_spent, rating, id, programmer_id:user.id, tag_ids }
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
          <UniversalForm closeForm={()=>setShowForm(!showForm)} header={<>Edit your entry from <br/><strong>{getEstheticDate(date)}</strong></>} onSubmit={handleEditingEntry}>
            <div className="w-full text-left">
              <SelectProgrammingLanguage ownLanguage text="Programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(sntz(event.target.value))}/>
              {
                programming_language!="Python"&&
                programming_language!="C++"&&
                programming_language!="Javascript"&&
                <UniversalInput 
                  text="Your own programming language:" 
                  required 
                  value={own_language} 
                  onChange={(event:any) => setOwnLanguage(sntz(capitalize(event.target.value)))} 
                />
              }
              <UniversalInput required type="number" text="Time spent in minutes" min={1} value={time_spent} onChange={(event:any) => setMinutesSpent(sntz(Number(event.target.value) as MinutesSpent))} extrastyle="h-10" /> 
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
              <FieldsRequired />
              <div className="mt-2 flex">
                <FormButton type="submit" text="Edit" className="mr-2 bg-button_green" />
                <FormButton onClick={handleDeletingEntry} className="bg-button_red" text="Delete"/>
              </div>
            </div>
          </UniversalForm>
      }
      {mode?
        <img src="upravit_zaznam_bily.png" className="m-auto h-[30px]" onClick={handleOpeningForm}/>
        :
        <img src="upravit_zaznam.png" className="m-auto h-[30px]" onClick={handleOpeningForm}/>
      }
    </div>
  )
}