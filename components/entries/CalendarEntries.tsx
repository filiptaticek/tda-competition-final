import { CalendarEntry } from "./CalendarEntry"
import { useSelector } from "react-redux"
import { getPastDate, getEstheticDate } from "../../src/functions"
import { Language, MinutesSpent, Rating } from "../../src/types"
import { AddEntryForm } from "../forms"
import clsx from "clsx"


export const CallendarEntries = ({daysBack}:{daysBack:number})=>{
  
  const mode = useSelector((state:any) => state.mode)
  const globalposts = useSelector((state:any) => state.records)
  const poradiDneVTydnu = new Date().getDay()
  const dny_v_tydnu = [
    {number:1-poradiDneVTydnu+daysBack,name:"Monday"},
    {number:2-poradiDneVTydnu+daysBack,name:"Tuesday"},
    {number:3-poradiDneVTydnu+daysBack,name:"Wednesday"},
    {number:4-poradiDneVTydnu+daysBack,name:"Thursday"},
    {number:5-poradiDneVTydnu+daysBack,name:"Friday"},
    {number:6-poradiDneVTydnu+daysBack,name:"Saturday"},
    {number:7-poradiDneVTydnu+daysBack,name:"Sunday"}
  ]

  return(
    <div className="w-full lg:flex">
      {dny_v_tydnu.map((den: { number: number, name:string})=>{
        const numberOfPosts = globalposts.filter((post: { datetime: string }) => post.datetime.substring(0,10) === getPastDate(den.number).substring(0,10)).length>2&&"border-b border-black"
        return(
          <div className="mx-1 mb-10 w-full" key={den.number}>
            <p className={clsx("border-2 font-bold text-center text-md",mode?"text-white border-white":"border-black")}>{den.name}<br/>{getEstheticDate(getPastDate(den.number))}</p>
            <AddEntryForm datetime={getPastDate(den.number)} />
            <div className={clsx("lg:h-[570px] overflow-scroll",numberOfPosts)}>
              {globalposts.map((entry: { datetime: string; programming_language: Language; rating: Rating; description: string; minutes_spent: MinutesSpent; id: number,programmer_id:null|number,tag_ids:number[]}):any=>{
                if (entry.datetime.substring(0,10)===getPastDate(den.number).substring(0,10)){
                  return(
                    <CalendarEntry 
                      datetime={entry.datetime}
                      programming_language={entry.programming_language}
                      rating={entry.rating}
                      description={entry.description}
                      minutes_spent={entry.minutes_spent}
                      key={entry.id}
                      id={entry.id}
                      programmer_id={entry.programmer_id}
                      tag_ids={entry.tag_ids}
                    />
                  )}})}
            </div>
          </div>
        )
      })}
    </div>
  )
}