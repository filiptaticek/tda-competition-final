import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./forms/EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"
import { RatingLogo } from "./RatingLogo"

export const CalendarEntry = ({programming_language,minutes_spent,rating,description, datetime, id}:IDiaryEntry)=>{
  return(
    <div className="h-[250px] overflow-hidden text-center border-x-2 border-b-2 border-black p-2 m-auto">
      <div className="mb-5">
        <ProgrammingLanguageLogo programming_language={programming_language}/>
      </div>
      <p><span className="font-bold">{minutes_spent}</span> minutes</p>
      <RatingLogo rating={rating} />
      <p className="h-[50px] overflow-scroll mt-5 italic">{description}</p>
      <EditEntryForm 
        datetime={datetime} 
        postMinutesSpent={minutes_spent} 
        postProgrammingLanguage={programming_language}
        postRating={rating}
        postComment={description}
        postId={id}
      />
    </div>
  )
}