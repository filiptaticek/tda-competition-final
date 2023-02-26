import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Language, MinutesSpent, Rating, ITag } from "../../src/types"
import { addSingleRecord } from "../../src/store/actions"
import { sntz, getEstheticDate,postRequest, formatDate } from "../../src/functions"
import { Description } from "../Description"
import { UniversalForm } from "./UniversalForm"
import { UniversalInput, SelectRating, SelectProgrammingLanguage, FormButton } from "../formParts"
import { inputSameProperties, addPostButtonProps } from "../../src/constants"
import clsx from "clsx"
import { State } from "../../src/types"

export const AddEntryForm = ({date}:{date:string})=>{
  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>("Python")
  const [own_language, setOwnLanguage] = useState<string>("")
  const [time_spent, setTimeSpent] = useState<MinutesSpent>(1 as MinutesSpent)
  const [rating, setRating] = useState<Rating>(1)
  const [description, setDescription] = useState<string>("")
  const [picked, setPicked] = useState<ITag[]>([])
  const dispatch = useDispatch()
  const { mode, tags, user, token } = useSelector((state: State) => state)
  
  const handleTags = (tag:ITag) => {
    if (picked.includes(tag)) {
      setPicked(picked.filter((thing:ITag) => thing.name !== tag.name))}
    else {
      setPicked([...picked, tag])
    }
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const tag_ids = picked.length!=0?picked.map(obj => obj.id):[]
    console.log(date.substring(0,10))
    const data = { date:date.substring(0,10), description, programming_language:programming_language!=="Python"&&programming_language!=="Javascript"&&programming_language!=="C++"?own_language:programming_language,  programmer_id:user.id, time_spent,rating, id:100, tag_ids }
    setShowForm(false)
    const toCoPrislo = await postRequest(data,"record",token)
    dispatch(addSingleRecord(toCoPrislo))
    setProgrammingLanguage("Python"),setTimeSpent(1 as MinutesSpent),setRating(1),setDescription("")
  }

  return (
    <div>
      {new Date() > new Date(date)?
        <div className={clsx(addPostButtonProps,"border-t-2 hover:opacity-80",mode?"bg-[#FFFFFF] text-main_color":"border-black text-white")} onClick={()=>setShowForm(!showForm)}>+</div>
        :
        <div className={clsx(addPostButtonProps,"border-t-2",mode?"bg-white text-white":"border-black text-main_color")}>+</div>
      }
      {showForm&&
      <UniversalForm closeForm={()=>{setShowForm(false)}} header={<>New entry on day <br/><strong>{getEstheticDate(date)}</strong></>} onSubmit={handleSubmit}>
        <div className="w-full">
          <SelectProgrammingLanguage text="programming language" ownLanguage value={programming_language} onChange={(event:any) => setProgrammingLanguage(sntz(event.target.value as Language))} />
          {
            programming_language!="Python"&&
                programming_language!="C++"&&
                programming_language!="Javascript"&&
                <UniversalInput 
                  text="Your own programming language:" 
                  required 
                  value={own_language} 
                  onChange={(event:any) => setOwnLanguage(sntz(event.target.value))} 
                />
          }
          <UniversalInput required type="number" text="Time spent in minutes" extrastyle="h-10" min={1} value={time_spent} onChange={(event:any) => setTimeSpent(sntz(Number(event.target.value) as MinutesSpent))}/>
          <SelectRating text="Rating" value={rating} onChange={(event:any) => setRating(sntz(parseInt(event.target.value) as Rating))}/>
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
          <textarea
            required
            className={inputSameProperties} 
            value={description} 
            onChange={(event) => setDescription(sntz(event.target.value))} />
          <div className="mt-8 flex">
            <FormButton className="bg-button_green" type="submit" text="Send"/>
          </div>
        </div>
      </UniversalForm>
      }
    </div>
  )
}