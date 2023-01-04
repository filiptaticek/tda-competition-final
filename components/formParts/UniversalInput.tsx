import { Description } from "../Description"
import { inputSameProperties } from "../../src/constants"
import clsx from "clsx"

interface IUniversalInput {
    text:string,
    min?:boolean,
    value:any,
    onChange:any,
    extrastyle?:string,
    type?:any
}

export const UniversalInput = ({text,min,value,onChange,extrastyle,type}:IUniversalInput)=>{
  return(
    <>
      <Description text={text} />
      <input 
        className={clsx(inputSameProperties,extrastyle)} 
        type={type?type:"string"}
        min={min?"1":""}
        value={value} 
        onChange={onChange} 
      />
    </>
  )
}