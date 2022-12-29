import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./EditEntryForm"

export const Entry = ({programming_language,minutes_spent,rating,description, date, record_id}:IDiaryEntry)=>{
  return(
    <div className="h-[250px] w-[14.285714285%] m-auto text-center border-x-2 border-b-2 border-black p-2">
      <div className="mb-5">
        <p className="font-bold text-2xl text-center">
          {programming_language}<br/>
        </p>
      </div>
      <p><span className="font-bold">{minutes_spent}</span> minutes</p>
      <p><span className="font-bold">Rating of </span>{rating}</p>
      <p className="h-[50px] overflow-scroll mt-5 italic">{description}</p>
      <EditEntryForm 
        date={date} 
        postMinutesSpent={minutes_spent} 
        postProgrammingLanguage={programming_language}
        postRating={rating}
        postComment={description}
        postId={record_id}
      />
    </div>
  )
}