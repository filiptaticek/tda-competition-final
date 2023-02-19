import { inputSameProperties } from "../../src/constants"
import { Description } from "../Description"
import clsx from "clsx"

export const SelectYesNo = ({value,onChange, text}:{value:any,onChange:any, text:string})=>{
  return(
    <>
      <Description text={text} /><br/>
      <select 
        className={clsx(inputSameProperties,"w-fit")}
        value={value} 
        onChange={onChange}>
        <option key={1} value={"Yes"}>Yes</option>
        <option key={2} value={"No"}>No</option>
      </select>
    </>
  )
}