import { useSelector } from "react-redux"
import { useState } from "react"
import { Entry } from "./Entry"
import { Language, MinutesSpent, Rating } from "../src/types"
import { UniversalForm } from "./forms/UniversalForm"
import { FormButton } from "./formParts/FormButton"
import { UniversalInput, SelectRating, SelectProgrammingLanguage } from "./formParts/index.js"
import { SortEntriesForm } from "./forms/SortEntriesForm"

export const AllEntries = ()=>{

  //STATE
  const globalposts = useSelector((state:any) => state.records) //all the entries
  const [filters,setFiltersShown] = useState<boolean>(false) //should the filters form be shown? 
  const [sorting,setSortingShown] = useState<boolean>(false) //should the filters form be shown? 
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
  const [dateFilter, setDateFilter] = useState<[string,string]|undefined>(undefined) //DATE FILTER

  //FUNCTIONS HANDLING ALL THE INPUTS
  const handleMinimalDate = (event:any) => {setMinimalDate(event.target.value)}
  const handleMaximalDate = (event:any) => {setMaximalDate(event.target.value)}
  const handleMinimalTime = (event:any) => {setMinimalTime(event.target.value)}
  const handleMaximalTime = (event:any) => {setMaximalTime(event.target.value)}
  const handleMinimalRating = (event:any) => {setMinimalRating(event.target.value)}
  const handleMaximalRating = (event:any) => {setMaximalRating(event.target.value)}
  const handleProgrammingLanguage = (event:any) => {setProgrammingLanguage(event.target.value)}
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
      <div className="font-bold w-fit flex mb-2 m-auto w-[300px]">
        <FormButton className="bg-main_color mr-2" onClick={()=>setFiltersShown(true)} text="Filter entries" />
        <FormButton className="bg-main_color" onClick={()=>setSortingShown(true)} text="Sort entries"  />
      </div>      

      {//FORM HANDLING SORTING ENTRIES
        sorting&&
        <SortEntriesForm onClick={()=>setSortingShown(false)}/>
      }

      {//FORM HANDLING FILTERING ENTRIES
        filters&&
        <UniversalForm header={<p className="font-bold">Set some filters</p>} closeForm={()=>{setFiltersShown(false)}} onSubmit={handleTimeFilter}>
          <UniversalInput text="From" type="date" value={minimalDate} onChange={handleMinimalDate} />
          <UniversalInput text="To" type="date" value={maximalDate} onChange={handleMaximalDate} />
          <UniversalInput text="Minimal time" type="number" value={minimalTime} onChange={handleMinimalTime} />
          <UniversalInput text="Maximal time" type="number" value={maximalTime} onChange={handleMaximalTime} />
          <SelectProgrammingLanguage text="Programming language" value={programmingLanguage} onChange={handleProgrammingLanguage} bonusOption={true} />
          <SelectRating text="Minimal rating" value={minimalRating} onChange={handleMinimalRating} />
          <SelectRating text="Maximal rating" value={maximalRating} onChange={handleMaximalRating} />
          <div className="flex mt-8">
            <FormButton type="submit" text="Submit" className="bg-button_green mr-1" />
            <FormButton onClick={resetFilters} text="Reset all filters" className="bg-button_red" />
          </div>
        </UniversalForm>
      }

      {/*ALL THE ENTRIES*/}
      <div className="w-full lg:flex flex-wrap">
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

          const timeCondition = timeFilter&&entry.minutes_spent>timeFilter[0]&&entry.minutes_spent<timeFilter[1]
          const programmingLanguageCondition = programmingLanguageFilter&&entry.programming_language===programmingLanguageFilter
          const ratingCondition = entry.rating>=ratingFilter[0]&&entry.rating<=ratingFilter[1]
          const dateCondition = dateFilter&&entry.date>=dateFilter[0]&&entry.date<=dateFilter[1]

          if (timeFilter&&programmingLanguageFilter&&dateFilter){
            if (ratingCondition
                &&timeCondition
                &&programmingLanguageCondition
                &&dateCondition)
              return(newEntry)
          }
          else if (timeFilter&&dateFilter){
            if (timeCondition
                &&ratingCondition
                &&dateCondition)
              return(newEntry)
          }
          else if (timeFilter&&programmingLanguageFilter){
            if (timeCondition
                &&ratingCondition
                &&programmingLanguageCondition)
              return(newEntry)
          }
          else if (programmingLanguageFilter&&dateFilter){
            if (ratingCondition
                &&programmingLanguageCondition
                &&dateCondition)
              return(newEntry)
          }
          else if (programmingLanguageFilter){
            if(ratingCondition&&programmingLanguageCondition)
              return(newEntry)
          }
          else if (timeFilter){
            if(ratingCondition&&timeCondition)
              return(newEntry)
          }
          else if (dateFilter){
            if(ratingCondition&&dateCondition)
              return(newEntry)
          }
          else if (ratingFilter){
            if (ratingCondition)
              return(newEntry)
          }
          else return(newEntry)
        })}
      </div>
    </>
  )
}