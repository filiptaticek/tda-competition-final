import "../styles/globals.css"
import type { AppProps } from "next/app"
import { store, wrapper } from "../src/store/store"
import { Provider,useDispatch } from "react-redux"
import { useEffect } from "react"
import { getRequest } from "../src/functions"
import { setUsers, setTags, setPage } from "../src/store/actions"


function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
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
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(App)

