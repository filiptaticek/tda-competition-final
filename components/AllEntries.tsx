import { Entry } from "./Entry"
import { useSelector } from "react-redux"
import { Language, Rating } from "../src/types"

export const AllEntries = ()=>{

  const globalposts = useSelector((state:any) => state.records)

  return(
    <div className="w-full flex flex-wrap border border-black">
      {globalposts.map((entry: { date: string; programming_language: Language; rating: Rating; description: string; minutes_spent: number; record_id: number }):any=>{
        return(
          <Entry 
            date={entry.date}
            programming_language={entry.programming_language}
            rating={entry.rating}
            description={entry.description}
            minutes_spent={entry.minutes_spent}
            key={entry.record_id}
            record_id={entry.record_id}
          />
        )
      })}
    </div>
  )
}