import { useDispatch, useSelector } from "react-redux"
import { getRequest } from "../src/functions/api/get"
import { useEffect } from "react"
import { User } from "../components/User"
import { Header } from "../components/Header"
import { setUsers } from "../src/store/actions"
import { AddUserForm } from "../components/forms/AddUserForm"

export default function UsersPage() {
  const dispatch = useDispatch()
  const users = useSelector((state:any) => state.users)
  //const [users,setUsers] = useState<IUser[]>([{first_name:"MarŤas",surname:"Dušín",programmer_id:1}])

  useEffect(() => {
    const updateState = async () =>{
      const serverData = await getRequest("programmer")
      dispatch(setUsers(serverData))
    }
    updateState()
  }, [dispatch])

  return (
    <div className="px-4 max-w-page_max m-auto">
      <Header />
      <AddUserForm />
      {users.map((user: { first_name: string; surname: string; programmer_id: number })=>{
        return(
          <User firstName={user.first_name} surname={user.surname} key={user.programmer_id} />
        )
      })}
    </div>
  )
}