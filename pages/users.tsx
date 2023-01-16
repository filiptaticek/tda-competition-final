import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { User } from "../components/User"
import { Header } from "../components/Header"
import { AddUserForm } from "../components/forms/AddUserForm"
import { setPage } from "../src/store/actions"

export default function UsersPage() {
  const users = useSelector((state:any) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPage("users"))
  }, [dispatch])

  return (
    <div className="px-4 max-w-page_max m-auto mb-5">
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
    </div>
  )
}