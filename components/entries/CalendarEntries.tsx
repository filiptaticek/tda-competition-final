/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import clsx from "clsx"
import { useSelector } from "react-redux"
import { useState } from "react"

import { getEstheticDate, getPastDate } from "../../src/functions"
import { IDiaryEntry, State } from "../../src/types"
import { AddEntryForm } from "../forms"
import { CalendarEntry } from "./CalendarEntry"

export const CallendarEntries = () => {
  const { mode, records } = useSelector((state: State) => state)
  const orderInTheWeek = new Date().getDay()
  const [daysBack, setDaysBack] = useState<number>(0)

  const daysOfTheWeek = [
    { number: 1 - orderInTheWeek + daysBack, name: "Monday" },
    { number: 2 - orderInTheWeek + daysBack, name: "Tuesday" },
    { number: 3 - orderInTheWeek + daysBack, name: "Wednesday" },
    { number: 4 - orderInTheWeek + daysBack, name: "Thursday" },
    { number: 5 - orderInTheWeek + daysBack, name: "Friday" },
    { number: 6 - orderInTheWeek + daysBack, name: "Saturday" },
    { number: 7 - orderInTheWeek + daysBack, name: "Sunday" }
  ]

  return (
    <div className="flex w-full">
      <img src={mode?"sipka_doleva_bila.png":"sipka_doleva.png"} className="mt-1 mr-2 h-min w-[40px] cursor-pointer" onClick={()=>setDaysBack(daysBack-7)}/>
      <div className="w-full lg:flex">
        {daysOfTheWeek.map((den: { number: number; name: string }) => {
          return (
            <div className="mx-1 mb-10 w-full" key={den.number}>
              <p className={clsx("rounded-t-3xl border-x-2 border-t-2 text-center text-xl font-bold", mode ? "border-white text-white" : "border-black")}>
                {den.name}
                <br />
                {getEstheticDate(getPastDate(den.number))}
              </p>
              <AddEntryForm date={getPastDate(den.number)} />
              <div className="overflow-scroll lg:max-h-[555px]">
                {records.map(
                  (entry:IDiaryEntry): any => {
                    if (getEstheticDate(entry.date) === getEstheticDate(getPastDate(den.number))) {
                      return (
                        <CalendarEntry
                          date={entry.date}
                          programming_language={entry.programming_language}
                          rating={entry.rating}
                          description={entry.description}
                          time_spent={entry.time_spent}
                          key={entry.id}
                          id={entry.id}
                          programmer_id={entry.programmer_id}
                          tag_ids={entry.tag_ids}
                        />
                      )}})}
              </div>
              <div className={`h-[25px] ${mode ? "border-white" : "border-black"} rounded-b-3xl border-x-2 border-b-2`} />
            </div>
          )})}
      </div>
      <img src={mode?"sipka_doprava_bila.png":"sipka_doprava.png"} className="mt-1 ml-3 h-min w-[40px] cursor-pointer" onClick={()=>setDaysBack(daysBack+7)}/>
    </div>
  )
}
