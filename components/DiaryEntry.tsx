import { IDiaryEntry } from "../src/types"

export const DiaryEntry = ({date,language,time,rating,comment}:IDiaryEntry)=>{
  return(
    <div className="border border-black w-[500px] my-10 m-auto">
      <p>Date: {date}</p>
      <p>Programming language: {language}</p>
      <p>Time spent: {time}</p>
      <p>Rating: {rating}</p>
      <p>Comment {comment}</p>
    </div>
  )
}