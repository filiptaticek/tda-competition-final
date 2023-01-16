import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Header } from "../components/Header"
import { Tag } from "../components/tags/Tag"
import { AddTagForm } from "../components/forms"
import { getRequest } from "../src/functions"
import { setTags, setPage} from "../src/store/actions"
import { ITag } from "../src/types"

export default function TagsPage() {

  const dispatch = useDispatch()
  const tags = useSelector((state:any) => state.tags)

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("tag")
      dispatch(setTags(serverData))
    }
    updateState()
    dispatch(setPage("tags"))
  }, [dispatch])

  return (
    <div>
      <Header />
      <AddTagForm />
      <div className="sm:flex max-w-[1110px] w-fit flex-wrap m-auto mb-10">
        {tags.map((tag:ITag)=>{
          return(
            <Tag name={tag.name} color={tag.color} id={tag.id} key={tag.id} description={tag.description} />
          )
        })}
      </div>
    </div>
  )
}