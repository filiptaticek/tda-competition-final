import { Description } from "../Description"
import { inputSameProperties, colors } from "../../src/constants"

interface ISelectColor {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
}

export const SelectColor = ({text,value,onChange}:ISelectColor)=>{
  return(
    <>
      <Description text={text} />
      <select 
        className={inputSameProperties} 
        value={value} 
        onChange={onChange}>
        {colors.map(color =>{
          return(
            <option key={color} value={color}>{color}</option>
          )
        })}
      </select>
    </>
  )
}