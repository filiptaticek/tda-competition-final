import { useSelector } from "react-redux"

import { ITag } from "../../src/types"
import { returnTagColor } from "./MiniTagIcon"

export const MiniTag = ({ id }: { id: number }) => {
  const tags = useSelector((state: any) => state.tags)
  const foundTag = tags.find((tag: ITag) => tag.id === id)

  return (
    <div className={`w-[100px] rounded-sm p-2 font-bold text-white ${returnTagColor(foundTag.color)}`}>
      <p>{foundTag.name}</p>
    </div>
  )
}
