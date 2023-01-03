import { Description } from "../Description"
import { inputSameProperties, programmingLanguages } from "../../src/constants"

interface ISelectProgrammingLanguage {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean
}

export const SelectProgrammingLanguage = ({text,value,onChange,bonusOption}:ISelectProgrammingLanguage)=>{
  return(
    <>
      <Description text={text} />
      <select 
        className={inputSameProperties} 
        value={value} 
        onChange={onChange}>
        {bonusOption&&<option value={undefined}>No language filter</option>}
        {programmingLanguages.map(pLanguage =>{
          return(
            <option key={pLanguage} value={pLanguage}>{pLanguage}</option>
          )
        })}
      </select>
    </>
  )
}