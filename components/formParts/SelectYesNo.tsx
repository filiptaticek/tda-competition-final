import { Description } from "../Description"

export const SelectYesNo = ({value,onChange, text}:{value:any,onChange:any, text:string})=>{

  return(
    <>
      <Description text={text} /><br/>
      <input
        className="mr-2"
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      Yes
    </>
  )
}