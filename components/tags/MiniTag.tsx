import { useSelector } from "react-redux"
import { ITag } from "../../src/types"
import { returnTagColor } from "./MiniTagIcon"

export const MiniTag = ({id}:{id:number}) =>{

  const tags = useSelector((state:any) => state.tags)
  const foundTag = tags.find((tag:ITag) => tag.id===id)
  const className = `text-white rounded-sm font-bold w-[100px] p-2 ${returnTagColor(foundTag.color)}`

  return(
    <div className={className}>
      <p>{foundTag.name}</p>
    </div>
  )
}