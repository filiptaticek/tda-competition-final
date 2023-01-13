import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"
import clsx from "clsx"

interface IUniversalInput {
    text:string,
    min?:boolean,
    max?:boolean
    value:any,
    onChange:any,
    extrastyle?:string,
    type?:any
}

export const UniversalInput = ({text,min,value,onChange,extrastyle,type, max}:IUniversalInput)=>{
  return(
    <>
      <Description text={text} />
      <input 
        className={clsx(inputSameProperties,extrastyle)} 
        type={type?type:"string"}
        min={min?"1":""}
        maxLength={max?12:undefined}
        value={value} 
        onChange={onChange} 
      />
    </>
  )
}