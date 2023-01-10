import { Header } from "../components/Header"
import { useEffect } from "react"
import { getRequest } from "../src/functions"
import { useDispatch } from "react-redux"
import { Tag } from "../components/Tag"
import { setTags } from "../src/store/actions"
import { useSelector } from "react-redux"
import { ITag } from "../src/types"
import { AddTagForm } from "../components/forms/AddTagForm"

export default function TagsPage() {

  const dispatch = useDispatch()
  const tags = useSelector((state:any) => state.tags)

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("tag")
      dispatch(setTags(serverData))
    }
    updateState()
  }, [dispatch])

  return (
    <div>
      <Header />
      <AddTagForm />
      {tags.map((tag:ITag)=>{
        return(
          <Tag name={tag.name} color={tag.color} id={tag.id} key={tag.id} description={tag.description} />
        )
      })}
    </div>
  )
}