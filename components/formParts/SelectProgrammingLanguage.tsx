import { Description } from "../Description"
import { inputSameProperties, programmingLanguages } from "../../src/constants"

interface ISelectProgrammingLanguage {
    text:string
    value:any,
    onChange:any,
    bonusOption?:boolean,
    ownLanguage?:boolean,
}

export const SelectProgrammingLanguage = ({text,value,onChange,bonusOption,ownLanguage}:ISelectProgrammingLanguage)=>{

  return(
    <>
      <Description text={text+" *"} />
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
        {ownLanguage&&<option key={1} value={""}>My own programming language</option>}
      </select>
    </>
  )
}