import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"

interface ISelectRating {
    text:string
    value:any,
    onChange:any
}

export const SelectRating = ({text,value,onChange}:ISelectRating)=>{
  return(
    <>
      <Description text={text}/><select className={inputSameProperties} value={value} onChange={onChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </>
  )
}