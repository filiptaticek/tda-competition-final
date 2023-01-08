import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./forms/EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"
import { RatingLogo } from "./RatingLogo"
import { useSelector } from "react-redux"
import { IUser } from "../src/types"

export const CalendarEntry = ({programming_language,minutes_spent,rating,description, datetime, id,programmer_id}:IDiaryEntry)=>{
  
  const users = useSelector((state:any) => state.users)
  const programmerObject = users.find((programmer:IUser) => programmer.id === programmer_id)
  const programmer= programmerObject?programmerObject.first_name + " " + programmerObject.surname:""
  
  return(
    <div className="py-5 hs-[250px] hover:bg-gray-100 overflow-hidden text-center border-x-2 border-b-2 border-black p-2 m-auto">
      {programmer&&<p>{programmer}</p>}
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
        postProgrammerId={programmer_id}
      />
    </div>
  )
}