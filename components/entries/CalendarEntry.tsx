/* eslint-disable react/no-unescaped-entities */

import { useState } from "react"

import clsx from "clsx"
import { useSelector } from "react-redux"

import { lastDate } from "../../src/functions"
import { IDiaryEntry, State } from "../../src/types"
import { EditEntryForm, UniversalForm } from "../forms"
import { ProgrammingLanguageLogo } from "../ProgrammingLanguageLogo"
import { RatingLogo } from "../RatingLogo"
import { MiniTag } from "../tags"

export const CalendarEntry = ({ programming_language, time_spent, rating, description, date, id, programmer_id, tag_ids }: IDiaryEntry) => {
  const { mode, user } = useSelector((state: State) => state)
  const [showDetail, setDetailShown] = useState<boolean>(false)
  const programmer = user.name + " " + user.surname
  const Header = () => {
    return (
      <>
        {<>{programmer}'s </>}
        post from <br />
        <strong>{lastDate(date)}</strong>
      </>
    )
  }

  return (
    <div
      className={clsx(
        "m-auto overflow-hidden border-x-2 border-t p-2 py-5 text-center duration-300",
        mode ? "border-white hover:bg-[#8C3FB8]" : "border-black hover:bg-gray-100"
      )}
    >
      <div className={clsx("cursor-pointer", mode ? "text-white" : "")} onClick={() => setDetailShown(true)}>
        <ProgrammingLanguageLogo programming_language={programming_language} />
        <p className="mb-2 font-bold">{programming_language}</p>
        <RatingLogo rating={rating} />
        {description && (
          <p className="mt-5 h-[50px] overflow-scroll italic">
            {description.substring(0, 15)}
            {description.length > 12 && <>...</>}
          </p>
        )}
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
      {showDetail && (
        <UniversalForm className="pt-[150px] text-center" closeForm={() => setDetailShown(!showDetail)} header={<Header />}>
          <div className="mb-5"><ProgrammingLanguageLogo programming_language={programming_language} /></div>
          {tag_ids && (
            <div className="m-auto my-10 flex w-fit flex-wrap">
              {tag_ids.map((tag_id) => {
                return <MiniTag key={tag_id} id={tag_id} />
              })}
            </div>
          )}
          <p><span className="font-bold">{time_spent}</span> minutes</p>
          <RatingLogo rating={rating} />
          <p className="mt-5 italic">{description}</p>
        </UniversalForm>
      )}
    </div>
  )
}
