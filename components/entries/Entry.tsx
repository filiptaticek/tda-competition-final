/* eslint-disable react/no-unescaped-entities */
import { lastDate } from "../../src/functions"
import { IDiaryEntry, IUser } from "../../src/types"
import { UniversalForm, EditEntryForm } from "../forms"
import { ProgrammingLanguageLogo } from "../ProgrammingLanguageLogo"
import { RatingLogo } from "../RatingLogo"
import { useSelector } from "react-redux"
import { useState } from "react"
import { MiniTag, MiniTagIcon } from "../tags"
import { State } from "../../src/types"

export const Entry = ({programming_language,time_spent,rating,description, date, id, programmer_id, tag_ids}:IDiaryEntry)=>{

  const [showDetail, setDetailShown] = useState<boolean>(false)
  const { mode, users } = useSelector((state: State) => state)
  const programmerObject = users.find((programmer:IUser) => programmer.id === programmer_id)
  const programmer= programmerObject?programmerObject.name + " " + programmerObject.surname:""
  const Header = ()=> {
    return(
      <>
        {programmerObject?<>{programmer}'s </>:<>No user </>}
        post from <br/><strong>{lastDate(date)}</strong>
      </>
    )
  }

  return(
    <>
      <div onClick={()=>setDetailShown(true)} className="cursor-pointer h-[400px] lg:w-[20%] text-center rounded-md p-1">
        <div className={`border ${mode?"hover:bg-[#8C3FB8] border-white text-white":"border-black hover:bg-gray-100"} rounded-md pt-5 h-full`}>
          <div className="mb-5">
            <ProgrammingLanguageLogo programming_language={programming_language}/>
          </div>
          <p className="font-bold italic">{lastDate(date)}</p>
          <p><span className="font-bold">{time_spent}</span> minutes</p>
          {tag_ids?
            <div className="h-fit px-3 w-fit my-5 m-auto w-fit flex flex-wrap">{tag_ids.map(tag_id => {return(<MiniTagIcon key={tag_id} id={tag_id} />)})}</div>
            :
            <div className="h-[32px] my-5"/>}
          <RatingLogo rating={rating} />
          <p className="w-[200px] m-auto h-[50px] overflow-scroll mt-5 italic">{description}</p>
          <EditEntryForm 
            postProgrammerId={programmer_id}
            date={date} 
            postMinutesSpent={time_spent} 
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
        <p><span className="font-bold">{time_spent}</span> minutes</p>
        <RatingLogo rating={rating} />
        <p className="mt-5 italic">{description}</p>
      </UniversalForm>}
    </>
  )
}