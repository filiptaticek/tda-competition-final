import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { User } from "../components/User"
import { Header } from "../components/Header"
import { AddUserForm } from "../components/forms/AddUserForm"
import { setPage } from "../src/store/actions"
import { Page } from "../components/Page"


export default function UsersPage() {
  const users = useSelector((state:any) => state.users)
  const user = useSelector((state:any) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPage("manage_users"))
  }, [dispatch])

  return (
    <Page>
      {user.admin?
        <>
          <Header />
          <AddUserForm />
          {users.map((user: { name: string; surname: string; id: number })=>{
            return(
              <User 
                id={user.id} 
                name={user.name} 
                surname={user.surname} 
                key={user.id} />
            )
          })}
        </>:
        <p className="m-auto my-10 w-[60%] text-5xl text-center font-bold">You have to be admin in order to reach this page</p>
      }
    </Page>
  )
}