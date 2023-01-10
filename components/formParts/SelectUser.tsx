import { Description } from "../Description"
import { useSelector } from "react-redux"
import { IUser } from "../../src/types"
import { inputSameProperties } from "../../src/constants"

interface ISelectUser {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
    actualUser?:boolean
}

export const SelectUser = ({text,value,onChange,actualUser}:ISelectUser)=>{

  const users = useSelector((state:any) => state.users)

  return(
    <>
      <Description text={text}/>
      <select
        value={value}
        onChange={onChange}
        className={inputSameProperties}
      >
        {actualUser&&<option disabled key={1} value={"Actual user"}>{"Actual user"}</option>}
        <option key={2} value={"No user"}>{"No user"}</option>
        {users.map((user:IUser)=>{
          const userFullName = user.name+" "+user.surname
          return(
            <option key={user.id} value={userFullName}>{userFullName}</option>
          )
        })}
      </select>
        
    </>
  )
}