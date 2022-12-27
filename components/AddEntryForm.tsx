import { useState } from "react"
//import { postRequest } from "../src/api_functions/post"
import clsx from "clsx"
import { Language, Rating } from "../src/types"
import { useDispatch } from "react-redux"
import { addSingleRecord } from "../src/store/actions"

export const AddEntryForm = ()=>{

  const [language, setLanguage] = useState<Language>("Python")
  const [time, setTime] = useState<number>(0)
  const [rating, setRating] = useState<Rating>(0)
  const [comment, setComment] = useState<string>("")
  const dispatch = useDispatch()

  const handleSubmit = (event:any) => {
    event.preventDefault()
    const date=((new Date()).toString()).substring(4,15)
    const data = { date, comment, language, time, rating }
    //postRequest(data)
    console.log(data)
    setLanguage("Python"),setTime(0),setRating(0),setComment("")
    dispatch(addSingleRecord(data))
  }

  const sameProperties ="my-[4px] w-[300px] rounded-md border border-black m-2 p-2 m-auto"
  const Description = ({text}:{text:string})=>{
    return(
      <span className="font-bold text-sm">
        {text}
      </span>
    )
  }

  return (
    <form className="p-10 w-[500px] m-auto border border-black flex" onSubmit={handleSubmit}>
      <div className="m-auto w-[300px]">
        <Description text="Programming language" />
        <select 
          className={sameProperties} 
          value={language} 
          onChange={(event) => setLanguage(event.target.value as Language)}>
          <option value="Python">Python</option>
          <option value="Javascript">Javascript</option>
          <option value="C++">C++</option>
        </select>
        <br/>
        <Description text="Time spent in minutes" />
        <input 
          className={clsx(sameProperties,"h-10")} 
          value={time} 
          onChange={(event) => setTime(Number(event.target.value))} 
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
          value={comment} 
          onChange={(event) => setComment(event.target.value)} />
        <br/>
        <div className="flex mt-8">
          <button 
            className="m-auto px-5 py-2 rounded-md border border-black font-bold" 
            type="submit">
          Send
          </button>
        </div>
      </div>
    </form>
  )
}