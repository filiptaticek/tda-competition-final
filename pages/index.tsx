import { DiaryEntry } from "../components/DiaryEntry"
import { useSelector, useDispatch } from "react-redux"
import { Language, Rating } from "../src/types"
import { setRecords } from "../src/store/actions"
import { AddEntryForm } from "../components/AddEntryForm"
import { getRequest } from "../src/api_functions/get"
import { useEffect } from "react"

export default function Home() {
  const globalposts = useSelector((state:any) => state.records)
  const dispatch = useDispatch()

  useEffect(() => {
    const updateState = async () =>{
      dispatch(setRecords(await getRequest()))
      console.log("Worked perfectly")
    }
    updateState()
  }, [dispatch])

  return (
    <>
      <AddEntryForm />
      {globalposts.map((entry: { date: string; language: Language; rating: Rating; comment: string; time: number; key: string }):any=>{
        return(
          <DiaryEntry 
            date={entry.date}
            language={entry.language}
            rating={entry.rating}
            comment={entry.comment}
            time={entry.time}
            key={entry.comment}
          />
        )
      })}
    </>
  )
}