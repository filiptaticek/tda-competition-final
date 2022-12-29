import { useDispatch } from "react-redux"
import { setRecords } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { useEffect } from "react"
import { AllEntries } from "../components/AllEntries"

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest()
      dispatch(setRecords(serverData))
      serverData.map((thing: any) => console.log(thing))
    }
    updateState()
  }, [dispatch])

  return (
    <div className="px-4 border border-black">
      <p className="my-10 text-5xl text-center font-bold">Programming. Daily.</p>
      <AllEntries />
      <div className="w-full flex">
      </div>
    </div>
  )
}