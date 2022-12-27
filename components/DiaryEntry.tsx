import { IDiaryEntry } from "../src/types"

export const DiaryEntry = ({date,language,time,rating,comment}:IDiaryEntry)=>{
  return(
    <div className="border border-black w-[500px] my-10 p-10 border border-black m-auto">
      <p className="mb-5 text-2xl text-center">
        <span className="font-bold">{language}</span> from <span className="font-bold">{date}</span>
      </p>
      <p><span className="font-bold">Time spent: </span>{time}</p>
      <p><span className="font-bold">Rating: </span>{rating}</p>
      <p><span className="font-bold">Description: </span>{comment}</p>
    </div>
  )
}