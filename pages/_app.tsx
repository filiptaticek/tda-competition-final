import "../styles/globals.css"
import type { AppProps } from "next/app"
import { store, wrapper } from "../src/store/store"
import { Provider,useDispatch } from "react-redux"
import { useEffect } from "react"
import { getRequest } from "../src/functions"
import { setUsers, setTags, setUser, setToken } from "../src/store/actions"
import { LoginPage } from "../components/LoginPage"
import { useSelector } from "react-redux"

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()
  const user = useSelector((state:any) => state.user)
  const token = useSelector((state:any) => state.token)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON && !user) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      dispatch(setUser(user.user))
      dispatch(setToken(user.token))
    }

    const updateUsersAndTags = async () =>{
      if (token){
        const serverDataUsers = await getRequest("programmer",token)
        const serverDataTags = await getRequest("tag",token)
        dispatch(setUsers(serverDataUsers))
        dispatch(setTags(serverDataTags))
      }
    }
    updateUsersAndTags()

  }, [dispatch, token, user])

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

