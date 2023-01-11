import { useState } from "react"
import { ITag } from "../../src/types"
import { useSelector } from "react-redux"
import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"



export const SelectTags = () =>{
  const [picked, setPicked] = useState<ITag[]>([])
  const tags = useSelector((state:any) => state.tags)

  const handleTags = (tag:ITag) => {
    if (picked.includes(tag)) {
      setPicked(picked.filter((thing:ITag) => thing.name !== tag.name))} 
    else {
      setPicked([...picked, tag])
    }
  }

  return (
    <div className={inputSameProperties}>
      <Description text="Check the tags for your entry" />
      {tags.map((tag: ITag) => (
        <div key={tag.id}>
          <input
            type="checkbox"
            value={tag.name}
            checked={picked.includes(tag)}
            onChange={() => handleTags(tag)}
          />
          {tag.name}
        </div>
      ))}
    </div>
  )
}



