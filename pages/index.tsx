/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useDispatch } from "react-redux"
import { setRecords } from "../src/store/actions"
import { useState } from "react"
import { getRequest } from "../src/functions/api/get"
import { useEffect } from "react"
import { CallendarEntries } from "../components/CalendarEntries"
import { Header } from "../components/Header"

export default function Home() {
  const dispatch = useDispatch()
  const [daysBack,setDaysBack] = useState<number>(7)

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest()
      dispatch(setRecords(serverData))
      serverData.map((thing: any) => console.log(thing))
    }
    updateState()
  }, [dispatch])

  return (
    <div className="px-4">
      <Header />
      <div className="w-full flex">
        <img src="sipka_doleva.png" className="cursor-pointer mt-1 mr-2 w-min h-min" onClick={()=>setDaysBack(daysBack-7)}/>
        <CallendarEntries daysBack={daysBack} />
        <img src="sipka_doprava.png" className="cursor-pointer mt-1 ml-2 w-min h-min" onClick={()=>setDaysBack(daysBack+7)}/>
      </div>
    </div>
  )
}