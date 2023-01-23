import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setRecords, setPage } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { Entries } from "../components/entries/Entries"
import { Header } from "../components/Header"
import { Page } from "../components/Page"

export default function AllEntriesPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("record")
      dispatch(setRecords(serverData))
    }
    updateState()
    dispatch(setPage("all_entries"))
  }, [dispatch])

  return (
    <Page>
      <Header />
      <Entries />
    </Page>
  )
}