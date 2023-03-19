import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setRecords, setPage } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { CallendarEntries } from "../components/entries/CalendarEntries"
import { Header } from "../components/Header"
import { Page } from "../components/Page"

export default function Home() {
  const dispatch = useDispatch()
  const token = useSelector((state:any) => state.token)

  useEffect(() => {

    const updateState = async () =>{
      const serverData = await getRequest("record",token)
      dispatch(setRecords(serverData))
    }
    updateState()
    dispatch(setPage("home"))
  }, [dispatch, token])

  return (
    <Page>
      <title>Programming diary | Homepage</title>
      <Header />
      <CallendarEntries />
    </Page>
  )
}