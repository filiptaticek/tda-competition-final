import { DiaryEntry } from "./DiaryEntry"
import { useSelector } from "react-redux"
import { getPastDate } from "../src/functions/date/right_date"
import { getEstheticDate } from "../src/functions/date/esthetic_date"
import { Language, Rating } from "../src/types"
import { AddEntryForm } from "./AddEntryForm"

export const MainTab = ({daysBack}:{daysBack:number})=>{

  const globalposts = useSelector((state:any) => state.records)
  const dny_v_tydnu = [
    {number:-6+daysBack,name:"Monday"},
    {number:-5+daysBack,name:"Tuesday"},
    {number:-4+daysBack,name:"Wednesday"},
    {number:-3+daysBack,name:"Thursday"},
    {number:-2+daysBack,name:"Friday"},
    {number:-1+daysBack,name:"Saturday"},
    {number:daysBack,name:"Sunday"}
  ]

  return(
    <div className="w-full flex">
      {dny_v_tydnu.map((den: { number: number, name:string})=>{
        return(
          <div className="mx-1 w-full" key={den.number}>
            <p className="border-x-2 border-t-2 border-black font-bold text-center text-md">{den.name}<br/>{getEstheticDate(getPastDate(den.number))}</p>
            <AddEntryForm date={getPastDate(den.number)} />
            {globalposts.map((entry: { date: string; programming_language: Language; rating: Rating; description: string; minutes_spent: number; record_id: number }):any=>{
              if (entry.date.substring(0,10)===getPastDate(den.number).substring(0,10)){
                return(
                  <DiaryEntry 
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