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
      {
      /*
        <select 
        className={clsx(inputSameProperties,"w-fit")}
        value={value} 
        onChange={onChange}>
        <option key={1} value={"Yes"}>Yes</option>
        <option key={2} value={"No"}>No</option>
        </select>
      */
      }
    </>
  )
}