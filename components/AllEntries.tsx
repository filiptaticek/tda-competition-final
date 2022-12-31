import { Entry } from "./Entry"
import { useSelector } from "react-redux"
import { Language, MinutesSpent, Rating } from "../src/types"
import { useState } from "react"
import { UniversalForm } from "./UniversalForm"
import { inputSameProperties } from "../src/constants"
import { Description } from "./Description"
import { FormButton } from "./FormButton"

export const AllEntries = ()=>{

  //STATE
  const globalposts = useSelector((state:any) => state.records) //all the entries
  const [filters,setFiltersShown] = useState<boolean>(false) //should the filters form be shown? 
  const [minimalDate, setMinimalDate] = useState<string|undefined>(undefined) //DATE filter inputs
  const [maximalDate, setMaximalDate] = useState<string|undefined>(undefined)
  const [minimalTime, setMinimalTime] = useState<number>(0) //TIME filter inputs
  const [maximalTime, setMaximalTime] = useState<number>(0)
  const [minimalRating, setMinimalRating] = useState<Rating>(1) //RATING filter inputs
  const [maximalRating, setMaximalRating] = useState<Rating>(5)
  const [programmingLanguage, setProgrammingLanguage] = useState<string|"No language filter">("No language filter")//PROGRAMMING LANGUAGE filter inputs
  const [ratingFilter, setRatingFilter] = useState<[Rating,Rating]>([1,5]) //RATING FILTER
  const [timeFilter, setTimeFilter] = useState<[number,number]|undefined>(undefined) //TIME FILTER
  const [programmingLanguageFilter,setProgrammingLanguageFilter] =useState<string|undefined>(undefined) //PROGRAMMING LANGUAGE FILTER
  const [dateFilter, setDateFilter] = useState<[string,string]|undefined>(undefined)

  //FUNCTIONS HANDLING ALL THE INPUTS

  const handleMinimalDate = (event:any) => {
    setMinimalDate(event.target.value)
  }

  const handleMaximalDate = (event:any) => {
    setMaximalDate(event.target.value)
  }

  const handleMinimalTime = (event:any) => {
    setMinimalTime(event.target.value)
  }

  const handleMaximalTime = (event:any) => {
    setMaximalTime(event.target.value)
  }

  const handleMinimalRating = (event:any) => {
    setMinimalRating(event.target.value)
  }

  const handleMaximalRating = (event:any) => {
    setMaximalRating(event.target.value)
  }

  const handleProgrammingLanguage = (event:any) => {
    setProgrammingLanguage(event.target.value)
  }

  const handleTimeFilter = (event:any) => {
    event.preventDefault()
    setFiltersShown(false)
    if(minimalTime!==0||maximalTime!==0){setTimeFilter([minimalTime, maximalTime])}
    if(minimalDate&&maximalDate){setDateFilter([minimalDate,maximalDate])}
    if(minimalRating&&maximalRating){setRatingFilter([minimalRating, maximalRating])}
    programmingLanguage==="No language filter"?setProgrammingLanguageFilter(undefined):setProgrammingLanguageFilter(programmingLanguage)
  }

  const resetFilters = (event:any) =>{
    event.preventDefault()
    setMinimalTime(0),setMaximalTime(0),setMinimalRating(1),setMaximalRating(5),setProgrammingLanguage("No language filter"),setMinimalDate(undefined),setMaximalDate(undefined)
    setTimeFilter(undefined),setRatingFilter([1,5]),setProgrammingLanguageFilter(undefined),setDateFilter(undefined)
  }

  //BODY
  return(
    <>
      {/*BUTTONS SETTING ON FILTERS AND RANKINGS*/}
      <div className="font-bold w-fit mb-2 border border-black m-auto w-[300px]">
        <FormButton className="bg-emerald-200 w-[200px]" onClick={()=>setFiltersShown(!filters)} text="Filter entries" />
        <FormButton className="bg-emeralds-200 w-[200px]" text="Sort entries" />
      </div>

      { //WHOLE FORM WITH ALL THE INPUTS
        filters&&
        <UniversalForm header={<p className="font-bold">Set some filters</p>} closeForm={()=>{setFiltersShown(false)}} onSubmit={handleTimeFilter}>
          <Description text="From" />
          <input className={inputSameProperties} type="date" value={minimalDate} onChange={handleMinimalDate} />
          <br/>
          <Description text="To" />
          <input className={inputSameProperties} type="date" value={maximalDate} onChange={handleMaximalDate} />
          <br/>
          <Description text="Minimal time" />
          <input className={inputSameProperties} type="number" value={minimalTime} onChange={handleMinimalTime} />
          <br/>
          <Description text="Maximal time" />
          <input className={inputSameProperties} type="number" value={maximalTime} onChange={handleMaximalTime} />
          <br/>
          <Description text="Programming language" />
          <select className={inputSameProperties} value={programmingLanguage} onChange={handleProgrammingLanguage}>
            <option value={undefined}>No language filter</option>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
            <option value="C++">C++</option>
          </select>
          <Description text="Minimal rating" /><select className={inputSameProperties} value={minimalRating} onChange={handleMinimalRating}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Description text="Maximal rating"/><select className={inputSameProperties} value={maximalRating} onChange={handleMaximalRating}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br/>
          <div className="flex mt-8">
            <FormButton type="submit" text="Submit" className="bg-emerald-200 mr-1" />
            <FormButton onClick={resetFilters} text="Reset all filters" className="bg-red-200" />
          </div>
        </UniversalForm>
      }

      {/*ALL THE ENTRIES*/}
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

          const timeCondition =timeFilter&&entry.minutes_spent>timeFilter[0]&&entry.minutes_spent<timeFilter[1]
          const programmingLanguageCondition = programmingLanguageFilter&&entry.programming_language===programmingLanguageFilter
          const ratingCondition = ratingFilter&&entry.rating>=ratingFilter[0]&&entry.rating<=ratingFilter[1]
          const dateCondition = dateFilter&&entry.date>=dateFilter[0]&&entry.date<=dateFilter[1]

          if (timeFilter&&programmingLanguageFilter&&ratingFilter&&dateFilter){
            if (ratingCondition
                &&timeCondition
                &&programmingLanguageCondition
                &&dateCondition)
              return(newEntry)
          }
          /*else if (timeFilter&&programmingLanguageFilter&&dateFilter){
            if (timeCondition
                &&programmingLanguageCondition
                &&dateCondition)
              return(newEntry)
          }*/
          else if (timeFilter&&ratingFilter&&dateFilter){
            if (timeCondition
                &&ratingCondition
                &&dateCondition)
              return(newEntry)
          }
          else if (timeFilter&&ratingFilter&&programmingLanguageFilter){
            if (timeCondition
                &&ratingCondition
                &&programmingLanguageCondition)
              return(newEntry)
          }
          else if (ratingFilter&&programmingLanguageFilter&&dateFilter){
            if (ratingCondition
                &&programmingLanguageCondition
                &&dateCondition)
              return(newEntry)
          }
          else if (ratingFilter&&programmingLanguageFilter){
            if(ratingCondition&&programmingLanguageCondition)
              return(newEntry)
          }
          else if (ratingFilter&&timeFilter){
            if(ratingCondition&&timeCondition)
              return(newEntry)
          }
          else if (ratingFilter&&dateFilter){
            if(ratingCondition&&dateCondition)
              return(newEntry)
          }
          /*else if (programmingLanguageFilter&&timeFilter){
            if(programmingLanguageCondition&&timeCondition)
              return(newEntry)
          }
          else if (programmingLanguageFilter&&dateFilter){
            if(programmingLanguageCondition&&dateCondition)
              return(newEntry)
          }
          else if (timeFilter&&dateFilter){
            if(timeCondition&&dateCondition)
              return(newEntry)
          }
          else if (timeFilter){
            if (timeCondition)
              return(newEntry)
          }
          else if (programmingLanguageFilter){
            if (programmingLanguageCondition)
              return(newEntry)
            console.log("De to i bez toho")
          }*/
          else if (ratingFilter){
            if (ratingCondition)
              return(newEntry)
          }
          /*else if (dateFilter){
            if (dateCondition)
              return(newEntry)
          }*/
          else return(newEntry)
        })}
      </div>
    </>
  )
}