/* eslint-disable react/no-unescaped-entities */
import { IDiaryEntry } from "../src/types"
import { EditEntryForm } from "./forms/EditEntryForm"
import { ProgrammingLanguageLogo } from "./ProgrammingLanguageLogo"
import { RatingLogo } from "./RatingLogo"
import { useSelector } from "react-redux"
import { IUser } from "../src/types"
import { useState } from "react"
import { UniversalForm } from "./forms/UniversalForm"
import { getEstheticDate } from "../src/functions"

export const CalendarEntry = ({programming_language,minutes_spent,rating,description, datetime, id,programmer_id, tag_ids}:IDiaryEntry)=>{
  
  const users = useSelector((state:any) => state.users)
  const [showDetail, setDetailShown] = useState<boolean>(false) //NA CELOU VĚC KDYŽ SE KLIKNE TAK SE ROZBALÍ DETAIL TOHO PŘÍSPĚVKU 
  const programmerObject = users.find((programmer:IUser) => programmer.id === programmer_id)
  const programmer = programmerObject?programmerObject.name + " " + programmerObject.surname:""
  const Header = ()=> {
    return(
      <>
        {programmerObject?<>{programmer}'s </>:<>No user </>}
        post from <br/><strong>{getEstheticDate(datetime)}</strong>
      </>
    )
  }
  
  return(
    <div className="py-5 hover:bg-gray-100 overflow-hidden text-center border-x-2 border-b-2 border-black p-2 m-auto">
      <div className="cursor-pointer" onClick={()=>setDetailShown(true)}>
        <p className="font-bold h-10">{programmer?programmer:"No user"}</p>
        <div className="mb-10">
          <ProgrammingLanguageLogo programming_language={programming_language}/>
        </div>
        <RatingLogo rating={rating} />
        {description&&<p className="h-[50px] overflow-scroll mt-5 italic">{description.substring(0,15)}{description.length>10&&<>...</>}</p>}
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
      {showDetail&&
      <UniversalForm className="text-center" closeForm={()=>setDetailShown(!showDetail)} header={<Header/>}>
        <div className="mb-5">
          <ProgrammingLanguageLogo programming_language={programming_language}/>
        </div>
        {tag_ids&&<p>{JSON.stringify(tag_ids)}</p>}
        <p><span className="font-bold">{minutes_spent}</span> minutes</p>
        <RatingLogo rating={rating} />
        <p className="mt-5 italic">{description}</p>
      </UniversalForm>}
    </div>
  )
}