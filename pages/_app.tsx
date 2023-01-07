import "../styles/globals.css"
import type { AppProps } from "next/app"
import { store, wrapper } from "../src/store/store"
import { Provider,useDispatch } from "react-redux"
import { useEffect } from "react"
import { getRequest } from "../src/functions"
import { setUsers } from "../src/store/actions"

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("programmer")
      dispatch(setUsers(serverData))
    }
    updateState()
  }, [dispatch])


  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(App)

