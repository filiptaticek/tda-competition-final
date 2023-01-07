import { Description } from "../Description"
import { useSelector } from "react-redux"
import { IUser } from "../../src/types"
import { inputSameProperties } from "../../src/constants"

interface ISelectUser {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
}

export const SelectUser = ({text,value,onChange}:ISelectUser)=>{

  const users = useSelector((state:any) => state.users)

  return(
    <>
      <Description text={text}/>
      <select
        value={value}
        onChange={onChange}
        className={inputSameProperties}
      >
        <option key={2} value={""}>No user</option>
        {users.map((user:IUser)=>{
          const userFullName = user.first_name+" "+user.surname
          return(
            <option key={user.id} value={userFullName}>{userFullName}</option>
          )
        })}
      </select>
        
    </>
  )
}