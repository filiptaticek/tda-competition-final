/* eslint-disable react/no-unescaped-entities */
import { getEstheticDate } from "../../src/functions"
import { IDiaryEntry, IUser } from "../../src/types"
import { UniversalForm, EditEntryForm } from "../forms"
import { ProgrammingLanguageLogo } from "../ProgrammingLanguageLogo"
import { RatingLogo } from "../RatingLogo"
import { useSelector } from "react-redux"
import { MiniTag, MiniTagIcon } from "../tags"
import { useState } from "react"

export const Entry = ({programming_language,minutes_spent,rating,description, datetime, id, programmer_id, tag_ids}:IDiaryEntry)=>{

  const [showDetail, setDetailShown] = useState<boolean>(false)
  const users = useSelector((state:any) => state.users)
  const programmerObject = users.find((programmer:IUser) => programmer.id === programmer_id)
  const programmer= programmerObject?programmerObject.name + " " + programmerObject.surname:""
  const Header = ()=> {
    return(
      <>
        {programmerObject?<>{programmer}'s </>:<>No user </>}
        post from <br/><strong>{getEstheticDate(datetime)}</strong>
      </>
    )
  }

  return(
    <>
      <div onClick={()=>setDetailShown(true)} className="cursor-pointer border-collapse h-[400px] lg:w-[20%] text-center rounded-md p-1">
        <div className="border hover:bg-gray-100 border-black pt-5 h-full">
          <p className="font-bold">{programmer?programmer:"No user"}</p>
          <div className="mb-5">
            <ProgrammingLanguageLogo programming_language={programming_language}/>
          </div>
          <p className="font-bold italic">{getEstheticDate(datetime)}</p>
          <p><span className="font-bold">{minutes_spent}</span> minutes</p>
          {tag_ids?
            <div className="h-fit px-3 w-fit my-5 m-auto w-fit flex flex-wrap">{tag_ids.map(tag_id => {return(<MiniTagIcon key={tag_id} id={tag_id} />)})}</div>
            :
            <div className="h-[32px] my-5"/>}
          <RatingLogo rating={rating} />
          <p className="w-[200px] m-auto h-[50px] overflow-scroll mt-5 italic">{description}</p>
          <EditEntryForm 
            postProgrammerId={programmer_id}
            datetime={datetime} 
            postMinutesSpent={minutes_spent} 
            postProgrammingLanguage={programming_language}
            postRating={rating}
            postComment={description}
            postId={id}
            postTagIds={tag_ids}
          />
        </div>
      </div>
      {showDetail&&
      <UniversalForm className="pt-[150px] text-center" closeForm={()=>setDetailShown(!showDetail)} header={<Header/>}>
        <div className="mb-5">
          <ProgrammingLanguageLogo programming_language={programming_language}/>
        </div>
        {tag_ids&&<div className="w-fit m-auto my-10 flex flex-wrap">{tag_ids.map(tag_id => {return(<MiniTag key={tag_id} id={tag_id} />)})}</div>}
        <p><span className="font-bold">{minutes_spent}</span> minutes</p>
        <RatingLogo rating={rating} />
        <p className="mt-5 italic">{description}</p>
      </UniversalForm>}
    </>
  )
}