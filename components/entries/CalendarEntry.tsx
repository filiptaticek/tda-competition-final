/* eslint-disable react/no-unescaped-entities */
import { IDiaryEntry } from "../../src/types"
import { EditEntryForm, UniversalForm } from "../forms"
import { ProgrammingLanguageLogo } from "../ProgrammingLanguageLogo"
import { RatingLogo } from "../RatingLogo"
import { useSelector } from "react-redux"
import { useState } from "react"
import { MiniTag } from "../tags"
import { State } from "../../src/types"
import clsx from "clsx"
import { lastDate } from "../../src/functions"

export const CalendarEntry = ({programming_language,time_spent,rating,description, date, id,programmer_id, tag_ids}:IDiaryEntry)=>{
  
  const { mode, user } = useSelector((state: State) => state)
  const [showDetail, setDetailShown] = useState<boolean>(false)
  const programmer = user.name + " " + user.surname
  const Header = ()=> {
    return(
      <>
        {<>{programmer}'s </>}
        post from <br/><strong>{lastDate(date)}</strong>
      </>
    )
  }
  
  return(
    <div className={clsx("duration-300 py-5 overflow-hidden text-center border-x-2 p-2 m-auto border-b",mode?"hover:bg-[#8C3FB8] border-white":"border-black hover:bg-gray-100")}>
      <div className={clsx("cursor-pointer",mode?"text-white":"")} onClick={()=>setDetailShown(true)}>
        <div className="mb-10">
          <ProgrammingLanguageLogo programming_language={programming_language}/>
        </div>
        <RatingLogo rating={rating} />
        {description&&<p className="h-[50px] overflow-scroll mt-5 italic">{description.substring(0,15)}{description.length>10&&<>...</>}</p>}
        <EditEntryForm 
          date={date} 
          postMinutesSpent={time_spent} 
          postProgrammingLanguage={programming_language}
          postRating={rating}
          postComment={description}
          postId={id}
          postProgrammerId={programmer_id}
          postTagIds={tag_ids}
        />
      </div>
      {showDetail&&
      <UniversalForm className="pt-[150px] text-center" closeForm={()=>setDetailShown(!showDetail)} header={<Header/>}>
        <div className="mb-5">
          <ProgrammingLanguageLogo programming_language={programming_language}/>
        </div>
        {tag_ids&&<div className="w-fit m-auto my-10 flex flex-wrap">{tag_ids.map(tag_id => {return(<MiniTag key={tag_id} id={tag_id} />)})}</div>}
        <p><span className="font-bold">{time_spent}</span> minutes</p>
        <RatingLogo rating={rating} />
        <p className="mt-5 italic">{description}</p>
      </UniversalForm>}
    </div>
  )
}