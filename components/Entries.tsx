import { useSelector } from "react-redux"
import { useState } from "react"
import { Entry } from "./Entry"
import { Language, MinutesSpent, Rating } from "../src/types"
import { UniversalForm } from "./forms/UniversalForm"
import { FormButton } from "./formParts/FormButton"
import { UniversalInput, SelectRating, SelectProgrammingLanguage } from "./formParts/index.js"
import { SortEntriesForm } from "./forms/SortEntriesForm"
import { SelectUser } from "./formParts/SelectUser"
import { IUser, ITag } from "../src/types"
import { inputSameProperties } from "../src/constants"
import { Description } from "./Description"

export const Entries = ()=>{

  //STATE
  const users = useSelector((state:any) => state.users) //all the users
  const tags = useSelector((state:any) => state.tags)
  const globalposts = useSelector((state:any) => state.records) //all the entries
  const [filters,setFiltersShown] = useState<boolean>(false) //should the filters form be shown? 
  const [sorting,setSortingShown] = useState<boolean>(false) //should the filters form be shown? 
  const [minimalDate, setMinimalDate] = useState<string|undefined>(undefined) //DATE filter inputs
  const [maximalDate, setMaximalDate] = useState<string|undefined>(undefined)
  const [minimalTime, setMinimalTime] = useState<number>(0) //TIME filter inputs
  const [maximalTime, setMaximalTime] = useState<number>(0)
  const [picked, setPicked] = useState<Array<ITag>>([])
  const [minimalRating, setMinimalRating] = useState<Rating>(1) //RATING filter inputs
  const [maximalRating, setMaximalRating] = useState<Rating>(5)
  const [user, setUser] = useState<string>("No user filter") //USER filter input
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("No language filter")//PROGRAMMING LANGUAGE filter inputs
  const [ratingFilter, setRatingFilter] = useState<[Rating,Rating]>([1,5]) //RATING FILTER
  const [timeFilter, setTimeFilter] = useState<[number,number]|undefined>(undefined) //TIME FILTER
  const [programmingLanguageFilter,setProgrammingLanguageFilter] =useState<string|undefined>(undefined) //PROGRAMMING LANGUAGE FILTER
  const [userFilter, setUserFilter] = useState<string|undefined>(undefined) //USER FILTER
  const [dateFilter, setDateFilter] = useState<[string,string]|undefined>(undefined) //DATE FILTER
  const [tagsFilter, setTagsFilter] = useState<Array<ITag>|undefined>(undefined)

  //FUNCTIONS HANDLING ALL THE INPUTS
  const handleMinimalDate = (event:any) => {setMinimalDate(event.target.value)}
  const handleMaximalDate = (event:any) => {setMaximalDate(event.target.value)}
  const handleMinimalTime = (event:any) => {setMinimalTime(event.target.value)}
  const handleMaximalTime = (event:any) => {setMaximalTime(parseInt(event.target.value))}
  const handleMinimalRating = (event:any) => {setMinimalRating(parseInt(event.target.value)as Rating)}
  const handleMaximalRating = (event:any) => {setMaximalRating(parseInt(event.target.value) as Rating)}
  const handleUser = (event:any) => {setUser(event.target.value)}
  const handleProgrammingLanguage = (event:any) => {setProgrammingLanguage(event.target.value)}
  const handleTags = (tag:ITag) => {if (picked.includes(tag)) {setPicked(picked.filter((thing:ITag) => thing.name !== tag.name))} else {setPicked([...picked, tag])}}

  const submitFilters = (event:any) => {
    event.preventDefault()
    setFiltersShown(false)
    if(minimalTime!==0||maximalTime!==0){setTimeFilter([minimalTime, maximalTime])}
    if(minimalDate&&maximalDate){setDateFilter([minimalDate,maximalDate])}
    if(minimalRating&&maximalRating){setRatingFilter([minimalRating, maximalRating])}
    picked.length>0&&setTagsFilter(picked)
    picked.length===0&&setTagsFilter(undefined)
    user==="No user filter"?setUserFilter(undefined):setUserFilter(user)
    programmingLanguage==="No language filter"?setProgrammingLanguageFilter(undefined):setProgrammingLanguageFilter(programmingLanguage)
  }

  const resetFilters = (event:any) =>{
    event.preventDefault()
    setMinimalTime(0),setMaximalTime(0),setMinimalRating(1),setMaximalRating(5),setProgrammingLanguage("No language filter"),setMinimalDate(undefined),setMaximalDate(undefined),setUser("No user filter"),setPicked([])
    setTimeFilter(undefined),setRatingFilter([1,5]),setProgrammingLanguageFilter(undefined),setDateFilter(undefined),setUserFilter(undefined),setTagsFilter(undefined)
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
        <UniversalForm header={<strong>Set some filters</strong>} closeForm={()=>{setFiltersShown(false)}} onSubmit={submitFilters}>
          <UniversalInput text="From" type="date" value={minimalDate} onChange={handleMinimalDate} />
          <UniversalInput text="To" type="date" value={maximalDate} onChange={handleMaximalDate} />
          <SelectUser text="Choose the user" value={user} onChange={handleUser} />
          <UniversalInput text="Minimal time" type="number" value={minimalTime} onChange={handleMinimalTime} />
          <UniversalInput text="Maximal time" type="number" value={maximalTime} onChange={handleMaximalTime} />
          <SelectProgrammingLanguage text="Programming language" value={programmingLanguage} onChange={handleProgrammingLanguage} bonusOption={true} />
          <SelectRating text="Minimal rating" value={minimalRating} onChange={handleMinimalRating} />
          <SelectRating text="Maximal rating" value={maximalRating} onChange={handleMaximalRating} />
          <Description text="Pick the tags for your entry" />
          <div className={inputSameProperties}>
            {tags.map((tag: ITag) => (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.name}
                  checked={picked.includes(tag)}
                  onChange={() => handleTags(tag)}
                />
                {tag.name}
              </div>
            ))}
          </div>
          <div className="flex mt-8">
            <FormButton type="submit" text="Submit" className="bg-button_green mr-1" />
            <FormButton onClick={resetFilters} text="Reset all filters" className="bg-button_red" />
          </div>
        </UniversalForm>
      }

      {/*ALL THE ENTRIES FILTERE*/}
      <div className="w-full lg:flex flex-wrap">
        {globalposts.map((entry: { datetime: string; programming_language: Language; rating: Rating; description: string; minutes_spent: MinutesSpent; id: number,programmer_id:number|null,tag_ids:number[]}):any=>{
          if (programmingLanguageFilter&&entry.programming_language!==programmingLanguageFilter){return false}
          if (userFilter&&!(entry.programmer_id===(users.find((programmer:IUser) => programmer.name === user.split(" ")[0]).id))) {return false}
          if (dateFilter&&!(entry.datetime>=dateFilter[0]&&entry.datetime<=dateFilter[1])){return false}
          if  (timeFilter&&!(entry.minutes_spent>timeFilter[0]&&entry.minutes_spent<timeFilter[1])) {return false}
          if (!(entry.rating>=ratingFilter[0]&&entry.rating<=ratingFilter[1])){return false}
          if (tagsFilter&&!entry.tag_ids){return false}
          if (tagsFilter&&tagsFilter.some(tag => entry.tag_ids.includes(tag.id)===false)){return false}

          else return(
            <Entry 
              datetime={entry.datetime}
              programming_language={entry.programming_language}
              rating={entry.rating}
              description={entry.description}
              minutes_spent={entry.minutes_spent}
              key={entry.id}
              id={entry.id}
              programmer_id={entry.programmer_id}
              tag_ids={entry.tag_ids}
            />
          )
        })}
      </div>
    </>
  )
}