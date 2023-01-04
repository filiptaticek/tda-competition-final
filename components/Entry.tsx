import { getEstheticDate } from "../src/functions/index.js"
import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./forms/EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"
import { RatingLogo } from "./RatingLogo"

export const Entry = ({programming_language,minutes_spent,rating,description, date, record_id}:IDiaryEntry)=>{
  return(
    <div className="border-collapse h-[350px] lg:w-[20%] text-center rounded-md p-1">
      <div className="border border-black pt-5 h-full">
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
    </div>
  )
}