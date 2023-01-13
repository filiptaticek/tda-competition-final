import { Description } from "../Description"
import { inputSameProperties, colorsNames } from "../../src/constants"
import { useSelector } from "react-redux"

interface ISelectColor {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
}

export const SelectColor = ({text,value,onChange}:ISelectColor)=>{
  const tags = useSelector((state:any) => state.tags)
  
  return(
    <>
      <Description text={text} />
      <select 
        className={inputSameProperties} 
        value={value} 
        onChange={onChange}>
        {colorsNames.map(color =>{
          return(
            <option key={color} value={color}>{color}</option>
          )
        })}
      </select>
    </>
  )
}