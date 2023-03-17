import { Description } from "../Description"
import { inputSameProperties, colorsNames } from "../../src/constants"

interface ISelectColor {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
    color?:string
}

export const SelectColor = ({text,value,onChange,color}:ISelectColor)=>{

  return(
    <>
      <Description text={text+" *"} />
      <select 
        className={inputSameProperties} 
        value={value} 
        onChange={onChange}>
        {color&&<option key={0} value={color}>{color}</option>}
        {colorsNames.map(color =>{
          return(
            <option key={color} value={color}>{color}</option>
          )
        })}
      </select>
    </>
  )
}