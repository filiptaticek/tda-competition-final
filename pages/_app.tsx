import "../styles/globals.css"
import type { AppProps } from "next/app"
import { store, wrapper } from "../src/store/store"
import { Provider,useDispatch } from "react-redux"
import { useEffect } from "react"
import { getRequest } from "../src/functions"
import { setUsers, setTags } from "../src/store/actions"
import { LoginPage } from "../components/LoginPage"
import { useSelector } from "react-redux"

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()
  const user = useSelector((state:any) => state.user)

  useEffect(() => {

    const karel = window.localStorage.getItem("karel")
    if (karel) {
      console.log("Karel je přihlášen")
      //dispatch(toggleUser())
    }

    const updateUsers = async () =>{
      const serverData = await getRequest("programmer")
      dispatch(setUsers(serverData))
    }
    updateUsers()
    const updateTags = async () =>{
      const serverData = await getRequest("tag")
      dispatch(setTags(serverData))
    }
    updateTags()
  }, [dispatch])

  return(
    <Provider store={store}>
      {user?
        <Component {...pageProps} />:
        <LoginPage />
      }
    </Provider>
  )
}

export default wrapper.withRedux(App)

