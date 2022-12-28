import { IDiaryEntry } from "../src/types"

export const DiaryEntry = ({date,programming_language,minutes_spent,rating,description}:IDiaryEntry)=>{
  return(
    <div className="rounded-md text-center border border-black p-5 border border-black m-auto">
      <div className="mb-5">
        <p className="font-bold text-2xl text-center">
          {programming_language}<br/>
        </p>
        <p><span className="font-bold">{date.substring(0,10)}</span></p>
      </div>
      <p><span className="font-bold">{minutes_spent}</span> minutes spent</p>
      <p><span className="font-bold">Rating of </span>{rating}</p>
      <p className="mt-5 italic">{description}</p>
    </div>
  )
}