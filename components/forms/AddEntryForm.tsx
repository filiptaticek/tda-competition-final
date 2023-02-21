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

export const AddEntryForm = ({date}:{date:string})=>{
  const [showForm, setShowForm] = useState<boolean>(false)
  const [programming_language, setProgrammingLanguage] = useState<Language>("Python")
  const [time_spent, setTimeSpent] = useState<MinutesSpent>(1 as MinutesSpent)
  const [rating, setRating] = useState<Rating>(1)
  const [description, setDescription] = useState<string>("")
  const [picked, setPicked] = useState<ITag[]>([])
  const dispatch = useDispatch()
  const mode = useSelector((state:any) => state.mode)
  const user = useSelector((state:any) => state.user)
  const tags = useSelector((state:any) => state.tags)
  const token = useSelector((state:any) => state.token)
  
  const handleTags = (tag:ITag) => {
    if (picked.includes(tag)) {
      setPicked(picked.filter((thing:ITag) => thing.name !== tag.name))}
    else {
      setPicked([...picked, tag])
    }
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const tag_ids = picked.length!==0?picked.map(obj => obj.id):[]
    const data = { date:formatDate(date), description, programming_language, programmer_id:user.id, time_spent,rating, id:100, tag_ids }
    console.log("Posílám na serveR:", data)
    setShowForm(false)
    const toCoPrislo = await postRequest(data,"record",token)
    console.log("Přišlo ze serveru:",toCoPrislo)
    dispatch(addSingleRecord(toCoPrislo))
    setProgrammingLanguage("Python"),setTimeSpent(1 as MinutesSpent),setRating(1),setDescription("")
  }

  return (
    <div>
      {new Date() > new Date(date)?
        <div className={clsx(addPostButtonProps,"hover:opacity-80",mode?"bg-white text-white border-white":"border-black text-white")} onClick={()=>setShowForm(!showForm)}>+</div>
        :
        <div className={clsx(addPostButtonProps,mode?"bg-white text-main_color border-white":"text-main_color border-black")}>+</div>
      }
      {showForm&&
      <UniversalForm closeForm={()=>{setShowForm(false)}} header={<>Create a new entry on day <br/><strong>{getEstheticDate(date)}</strong></>} onSubmit={handleSubmit}>
        <div className="w-full">
          <SelectProgrammingLanguage text="programming language" value={programming_language} onChange={(event:any) => setProgrammingLanguage(sntz(event.target.value as Language))} />
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
          <div className="flex mt-8">
            <FormButton className="bg-button_green" type="submit" text="Send"/>
          </div>
        </div>
      </UniversalForm>
      }
    </div>
  )
}