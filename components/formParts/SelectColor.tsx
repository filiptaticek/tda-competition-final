import { Description } from "../Description"
import { inputSameProperties, colorsNames } from "../../src/constants"
import { useSelector } from "react-redux"
import { ITag } from "../../src/types"

interface ISelectColor {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
    color?:string
}

export const SelectColor = ({text,value,onChange,color}:ISelectColor)=>{
  const tags = useSelector((state:any) => state.tags)
  const filteredColors = colorsNames.filter(color => !tags.some((tag:ITag) => tag.color === color))
  
  return(
    <>
      <Description text={text} />
      <select 
        className={inputSameProperties} 
        value={value} 
        onChange={onChange}>
        {color&&<option key={0} value={color}>{color}</option>}
        {filteredColors.map(color =>{
          return(
            <option key={color} value={color}>{color}</option>
          )
        })}
      </select>
    </>
  )
}