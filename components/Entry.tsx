import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"
import { RatingLogo } from "./RatingLogo"

export const Entry = ({programming_language,minutes_spent,rating,description, date, record_id}:IDiaryEntry)=>{
  return(
    <div className="border-collapse h-[300px] w-[20%] text-center border border-black p-2">
      <div className="mb-5">
        <ProgrammingLanguageLogo programming_language={programming_language}/>
      </div>
      <p className="h-[50px] font-bold italic">{getEstheticDate(date)}</p>
      <p><span className="font-bold">{minutes_spent}</span> minutes</p>
      <RatingLogo rating={rating} />
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