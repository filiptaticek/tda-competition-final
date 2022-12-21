import { DiaryEntry } from "../components/DiaryEntry"
import { useSelector } from "react-redux"
import { Language, Rating } from "../src/types"

export default function Home() {

  const globalposts = useSelector((state:any) => state.records)

  return (
    <>
      {globalposts.map((entry: { date: string; language: Language; rating: Rating; comment: string; time: number; key: number }):any=>{
        return(
          <DiaryEntry 
            date={entry.date}
            language={entry.language}
            rating={entry.rating}
            comment={entry.comment}
            time={entry.time}
            key={entry.key}
          />
        )
      })}
    </>
  )
}