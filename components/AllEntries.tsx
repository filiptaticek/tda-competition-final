import { Entry } from "./Entry"
import { useSelector } from "react-redux"
import { Language, MinutesSpent, Rating } from "../src/types"
import { useState } from "react"
import { UniversalForm } from "./UniversalForm"
import { inputSameProperties } from "../src/constants"
import { Description } from "./Description"

export const AllEntries = ()=>{

  const globalposts = useSelector((state:any) => state.records)
  const [filters,setFiltersShown] = useState<boolean>(false)
  const [minimalTime, setMinimalTime] = useState<number>(0)
  const [maximalTime, setMaximalTime] = useState<number>(0)
  const [programmingLanguage, setProgrammingLanguage] = useState(undefined)
  const [programmingLanguageFilter,setProgrammingLanguageFilter] =useState<string|undefined>(undefined)
  const [timeFilter, setTimeFilter] = useState<[number,number]|undefined>(undefined)

  const handleMinimalTime = (event:any) => {
    setMinimalTime(event.target.value)
  }

  const handleMaximalTime = (event:any) => {
    setMaximalTime(event.target.value)
  }

  const handleProgrammingLanguage = (event:any) => {
    setProgrammingLanguage(event.target.value)
  }

  const handleTimeFilter = (event:any) => {
    event.preventDefault()
    setFiltersShown(false)
    if(minimalTime!==0||maximalTime!==0){setTimeFilter([minimalTime, maximalTime])}
    programmingLanguage==="No language"?setProgrammingLanguageFilter(undefined):setProgrammingLanguageFilter(programmingLanguage)
  }

  const resetFilters = (event:any) =>{
    event.preventDefault()
    setFiltersShown(false)
    setMinimalTime(0),setMaximalTime(0)
    setTimeFilter(undefined)
    setProgrammingLanguageFilter(undefined)
    setProgrammingLanguage(undefined)
  }

  return(
    <>
      <p className="font-bold">Time filter:</p>
      <button className="border border-black" onClick={()=>{setFiltersShown(!filters)}}>Filter the entries</button>
      {
        filters&&
        <UniversalForm header="Set some filters" onSubmit={handleTimeFilter}>
          <Description text="Minimal time" />
          <input className={inputSameProperties} type="number" value={minimalTime} onChange={handleMinimalTime} />
          <br/>
          <Description text="Maximal time" />
          <input className={inputSameProperties} type="number" value={maximalTime} onChange={handleMaximalTime} />
          <br/>
          <Description text="Programming language" />
          <select className={inputSameProperties} value={programmingLanguage} onChange={handleProgrammingLanguage}>
            <option value={undefined}>No language</option>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
            <option value="C++">C++</option>
          </select>
          <br/>
          <button className="border border-black" type="submit">Submit</button>
          <br/>
          <button className="border border-black" onClick={resetFilters}>reset all filters</button>
        </UniversalForm>
      }

      <div className="w-full flex flex-wrap">
        {globalposts.map((entry: { date: string; programming_language: Language; rating: Rating; description: string; minutes_spent: MinutesSpent; record_id: number }):any=>{
          const newEntry = <Entry 
            date={entry.date}
            programming_language={entry.programming_language}
            rating={entry.rating}
            description={entry.description}
            minutes_spent={entry.minutes_spent}
            key={entry.record_id}
            record_id={entry.record_id}
          />
          if (timeFilter&&programmingLanguageFilter){
            if (entry.minutes_spent>timeFilter[0]&&entry.minutes_spent<timeFilter[1])
              if(entry.programming_language===programmingLanguageFilter)
                return(
                  newEntry
                )
            console.log("Vyplivlo to v 0: :",timeFilter,programmingLanguageFilter,"pro příspěvek",entry.description)
          }
          else if (programmingLanguageFilter){
            if(entry.programming_language===programmingLanguageFilter)
              return(newEntry)
            console.log("Vyplivlo to v 1: :",timeFilter,programmingLanguageFilter,"pro příspěvek",entry.description)
          }
          else if (timeFilter){
            if(entry.minutes_spent>timeFilter[0]&&entry.minutes_spent<timeFilter[1])
              return(newEntry)
            console.log("Vyplivlo to v 2: :",timeFilter,programmingLanguageFilter,"pro příspěvek",entry.description)
          }
          else return(newEntry)
          console.log("Vyplivlo to v 3 :",timeFilter,programmingLanguageFilter,newEntry,"pro příspěvek",entry.description)
        })}
      </div>
    </>
  )
}