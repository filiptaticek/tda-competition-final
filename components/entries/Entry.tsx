/* eslint-disable react/no-unescaped-entities */

import { useState } from "react"

import { useSelector } from "react-redux"
import { getEstheticDate } from "../../src/functions"

import { IDiaryEntry, IUser, State } from "../../src/types"
import { EditEntryForm, UniversalForm } from "../forms"
import { ProgrammingLanguageLogo } from "../ProgrammingLanguageLogo"
import { RatingLogo } from "../RatingLogo"
import { MiniTag, MiniTagIcon } from "../tags"

export const Entry = ({ programming_language, time_spent, rating, description, date, id, programmer_id, tag_ids }: IDiaryEntry) => {
  const [showDetail, setDetailShown] = useState<boolean>(false)
  const { mode, users } = useSelector((state: State) => state)
  const programmerObject = users.find((programmer: IUser) => programmer.id === programmer_id)
  const programmer = programmerObject ? programmerObject.name + " " + programmerObject.surname : ""
  const Header = () => {
    return (
      <>
        {programmerObject ? <>{programmer}'s </> : <>No user </>}
        post from <br />
        <strong>{getEstheticDate(date)}</strong>
      </>
    )
  }

  return (
    <>
      <div onClick={() => setDetailShown(true)} className="h-[420px] cursor-pointer rounded-md p-1 text-center lg:w-[20%]">
        <div className={`border-2 ${mode ? "border-white text-white hover:bg-[#3FA5FF]" : "border-black hover:bg-gray-100"} h-full rounded-2xl pt-5`}>
          <div className="mb-5">
            <ProgrammingLanguageLogo programming_language={programming_language} />
            <p className="mb-2 font-bold">{programming_language}</p>
          </div>
          <p className="font-bold italic">{getEstheticDate(date)}</p>
          <p><span className="font-bold">{time_spent}</span> minutes</p>
          {tag_ids.length!==0 ? 
            <div className="m-auto my-5 flex h-fit w-fit flex-wrap px-3">
              {tag_ids.map((tag_id) => {
                return <MiniTagIcon key={tag_id} id={tag_id} />
              })}
            </div>
            :
            <div className="my-5 h-[32px]"></div>
          }
          <RatingLogo rating={rating} />
          <p className="m-auto mt-5 h-[50px] w-[200px] overflow-scroll italic">{description}</p>
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
      {showDetail && (
        <UniversalForm className="pt-[150px] text-center" closeForm={() => setDetailShown(!showDetail)} header={<Header />}>
          <div className="mb-5">
            <ProgrammingLanguageLogo form programming_language={programming_language} />
            <p className="mb-2 font-bold">{programming_language}</p>
          </div>
          {tag_ids && (
            <div className="m-auto my-10 flex w-fit flex-wrap">
              {tag_ids.map((tag_id) => {return <MiniTag key={tag_id} id={tag_id} />})}
            </div>
          )}
          <p>
            <span className="font-bold">{time_spent}</span> minutes
          </p>
          <RatingLogo rating={rating} />
          <p className="mt-5 italic">{description}</p>
        </UniversalForm>
      )}
    </>
  )
}
