import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"

export const Entry = ({programming_language,minutes_spent,rating,description, date, record_id}:IDiaryEntry)=>{
  return(
    <div className="border-collapse h-[250px] w-[20%] text-center border border-black p-2">
      <div className="mb-5">
        <ProgrammingLanguageLogo programming_language={programming_language}/>
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