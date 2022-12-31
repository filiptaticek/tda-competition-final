import { CalendarEntry } from "./CalendarEntry"
import { useSelector } from "react-redux"
import { getPastDate } from "../src/functions/date/right_date"
import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { Language, MinutesSpent, Rating } from "../src/types"
import { AddEntryForm } from "./AddEntryForm"

export const CallendarEntries = ({daysBack}:{daysBack:number})=>{

  const globalposts = useSelector((state:any) => state.records)
  const poradiDneVTydnu = new Date().getDay()
  const dny_v_tydnu = [
    {number:-6-poradiDneVTydnu+daysBack,name:"Monday"},
    {number:-5-poradiDneVTydnu+daysBack,name:"Tuesday"},
    {number:-4-poradiDneVTydnu+daysBack,name:"Wednesday"},
    {number:-3-poradiDneVTydnu+daysBack,name:"Thursday"},
    {number:-2-poradiDneVTydnu+daysBack,name:"Friday"},
    {number:-1-poradiDneVTydnu+daysBack,name:"Saturday"},
    {number:daysBack-poradiDneVTydnu,name:"Sunday"}
  ]

  return(
    <div className="w-full flex">
      {dny_v_tydnu.map((den: { number: number, name:string})=>{
        return(
          <div className="mx-1 w-full" key={den.number}>
            <p className="border-2 border-black font-bold text-center text-md">{den.name}<br/>{getEstheticDate(getPastDate(den.number))}</p>
            <AddEntryForm date={getPastDate(den.number)} />
            {globalposts.map((entry: { date: string; programming_language: Language; rating: Rating; description: string; minutes_spent: MinutesSpent; record_id: number }):any=>{
              if (entry.date.substring(0,10)===getPastDate(den.number).substring(0,10)){
                return(
                  <CalendarEntry 
                    date={entry.date}
                    programming_language={entry.programming_language}
                    rating={entry.rating}
                    description={entry.description}
                    minutes_spent={entry.minutes_spent}
                    key={entry.record_id}
                    record_id={entry.record_id}
                  />
                )
              }
            })}
          </div>
        )
      })}
    </div>
  )
}