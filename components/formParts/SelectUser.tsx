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
    actualUserValue?:string
}

export const SelectUser = ({text,value,onChange,actualUser,actualUserValue}:ISelectUser)=>{

  const users = useSelector((state:any) => state.users)
  const mode = useSelector((state:any) => state.mode)

  return(
    <>
      <Description text={text}/>
      <select
        value={value}
        onChange={onChange}
        className={inputSameProperties}
      >
        {actualUser&&<option key={1} value={actualUserValue}>{actualUserValue}</option>}
        {actualUserValue!=="No user"&&<option key={2} value={"No user"}>{"No user"}</option>}
        {users.map((user:IUser)=>{
          const userFullName = user.name+" "+user.surname
          {if (actualUserValue!==userFullName){return(
            <option key={user.id} value={userFullName}>{userFullName}</option>
          )
          }}
        })}
      </select> 
    </>
  )
}