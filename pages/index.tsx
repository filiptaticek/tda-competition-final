/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { setRecords, setPage } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { CallendarEntries } from "../components/entries/CalendarEntries"
import { Header } from "../components/Header"
import { Page } from "../components/Page"

export default function Home() {
  const dispatch = useDispatch()
  const [daysBack,setDaysBack] = useState<number>(0)
  const mode = useSelector((state:any) => state.mode)
  const token = useSelector((state:any) => state.token)

  useEffect(() => {

    const updateState = async () =>{
      const serverData = await getRequest("record",token)
      console.log(token)
      console.log(serverData)
      dispatch(setRecords(serverData))
    }
    updateState()
    dispatch(setPage("home"))
  }, [dispatch, token])

  return (
    <Page>
      <Header />
      <div className="w-full flex">
        <img src={mode?"sipka_doleva_bila.png":"sipka_doleva.png"} className="w-[40px] cursor-pointer mt-1 mr-2 h-min" onClick={()=>setDaysBack(daysBack-7)}/>
        <CallendarEntries daysBack={daysBack} />
        <img src={mode?"sipka_doprava_bila.png":"sipka_doprava.png"} className="w-[40px] cursor-pointer mt-1 mr-2 h-min" onClick={()=>setDaysBack(daysBack+7)}/>
      </div>
    </Page>
  )
}