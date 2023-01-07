import { useSelector } from "react-redux"
import { User } from "../components/User"
import { Header } from "../components/Header"
import { AddUserForm } from "../components/forms/AddUserForm"

export default function UsersPage() {
  const users = useSelector((state:any) => state.users)

  return (
    <div className="px-4 max-w-page_max m-auto mb-5">
      <Header />
      <AddUserForm />
      {users.map((user: { first_name: string; surname: string; id: number })=>{
        return(
          <User 
            id={user.id} 
            firstName={user.first_name} 
            surname={user.surname} 
            key={user.id} />
        )
      })}
    </div>
  )
}