import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setRecords, setPage } from "../src/store/actions"
import { getRequest } from "../src/functions/api/get"
import { Entries } from "../components/entries/Entries"
import { Header } from "../components/Header"
import { Page } from "../components/Page"
import { useSelector } from "react-redux"

export default function AllEntriesPage() {
  const dispatch = useDispatch()
  const token = useSelector((state:any) => state.token)

  useEffect(() => {
    const updateState = async () =>{
      if (token){  
        const serverData = await getRequest("record",token)
        dispatch(setRecords(serverData))
      }
    }
    updateState()
    dispatch(setPage("all_entries"))
  }, [dispatch,token])

  return (
    <Page>
      <title>Programming diary | All entries</title>
      <Header />
      <Entries />
    </Page>
  )
}