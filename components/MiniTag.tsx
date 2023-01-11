import { useSelector } from "react-redux"
import { Color } from "../src/types"
import { ITag } from "../src/types"

export const returnTagColor = (color:Color)=> {switch (color) {
case "orange":return("bg-[#FFAA00]");case "red":return("bg-[#FF5562]")
case "blue":return("bg-[#001BFF]");case "green":return("bg-[#59D957]")
case "purple":return("bg-main_color");case "pink":return("bg-[#FE62EE]")
case "yellow":return("bg-[#F3E400]")
}}

export const MiniTag = ({id}:{id:number}) =>{

  const tags = useSelector((state:any) => state.tags)
  const foundTag = tags.find((tag:ITag) => tag.id===id)
  const className = `text-whites border border-black w-[33%] p-2 ${returnTagColor(foundTag.color)}`

  return(
    <div className={className}>
      <p>{foundTag.name}</p>
    </div>
  )
}