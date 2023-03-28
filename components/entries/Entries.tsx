import { useState } from "react"

import { useSelector } from "react-redux"

import { inputSameProperties } from "../../src/constants"
import { IDiaryEntry, ITag, Rating, State } from "../../src/types"
import { Description } from "../Description"
import { FormButton, SelectRating, UniversalInput } from "../formParts"
import { BlueWhiteButton } from "../formParts/BlueWhiteButton"
import { SortEntriesForm, UniversalForm } from "../forms"
import { Entry } from "./Entry"

export const Entries = () => {
  //STATE
  const { tags, records } = useSelector((state: State) => state)
  const [filters, setFiltersShown] = useState<boolean>(false) //should the filters form be shown?
  const [sorting, setSortingShown] = useState<boolean>(false) //should the filters form be shown?
  const [minimalDate, setMinimalDate] = useState<string | undefined>(undefined) //DATE filter inputs
  const [maximalDate, setMaximalDate] = useState<string | undefined>(undefined)
  const [minimalTime, setMinimalTime] = useState<number>(0) //TIME filter inputs
  const [maximalTime, setMaximalTime] = useState<number>(0)
  const [picked, setPicked] = useState<Array<ITag>>([])
  const [minimalRating, setMinimalRating] = useState<Rating>(1) //RATING filter inputs
  const [maximalRating, setMaximalRating] = useState<Rating>(5)
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("No language filter") //PROGRAMMING LANGUAGE filter inputs
  const [ratingFilter, setRatingFilter] = useState<[Rating, Rating]>([1, 5]) //RATING FILTER
  const [timeFilter, setTimeFilter] = useState<[number, number] | undefined>(undefined) //TIME FILTER
  const [programmingLanguageFilter, setProgrammingLanguageFilter] = useState<string | undefined>(undefined) //PROGRAMMING LANGUAGE FILTER
  const [dateFilter, setDateFilter] = useState<[string, string] | undefined>(undefined) //DATE FILTER
  const [tagsFilter, setTagsFilter] = useState<Array<ITag> | undefined>(undefined)

  //FUNCTIONS HANDLING ALL THE INPUTS
  const handleMinimalDate = (event: any) => {
    setMinimalDate(event.target.value)
  }
  const handleMaximalDate = (event: any) => {
    setMaximalDate(event.target.value)
  }
  const handleMinimalTime = (event: any) => {
    const value = event.target.value
    value >= 0 ? setMinimalTime(value) : setMinimalTime(0)
  }
  const handleMaximalTime = (event: any) => {
    const value = event.target.value
    value >= 0 ? setMaximalTime(value) : setMinimalTime(0)
  }
  const handleMinimalRating = (event: any) => {
    setMinimalRating(parseInt(event.target.value) as Rating)
  }
  const handleMaximalRating = (event: any) => {
    setMaximalRating(parseInt(event.target.value) as Rating)
  }
  const handleProgrammingLanguage = (event: any) => {
    setProgrammingLanguage(event.target.value)
  }
  const handleTags = (tag: ITag) => {
    if (picked.includes(tag)) {
      setPicked(picked.filter((thing: ITag) => thing.name !== tag.name))
    } else {
      setPicked([...picked, tag])
    }
  }

  const submitFilters = (event: any) => {
    event.preventDefault()
    setFiltersShown(false)
    if (minimalTime !== 0 || maximalTime !== 0) {
      setTimeFilter([minimalTime, maximalTime])
    }
    if (minimalDate && maximalDate) {
      setDateFilter([minimalDate, maximalDate])
    }
    if (minimalRating && maximalRating) {
      setRatingFilter([minimalRating, maximalRating])
    }
    picked.length > 0 && setTagsFilter(picked)
    picked.length === 0 && setTagsFilter(undefined)
    programmingLanguage === "No language filter" ? setProgrammingLanguageFilter(undefined) : setProgrammingLanguageFilter(programmingLanguage)
  }

  const resetFilters = (event: any) => {
    event.preventDefault()
    setMinimalTime(0),
      setMaximalTime(0),
      setMinimalRating(1),
      setMaximalRating(5),
      setProgrammingLanguage("No language filter"),
      setMinimalDate(undefined),
      setMaximalDate(undefined),
      setPicked([]),
      setTimeFilter(undefined),
      setRatingFilter([1, 5]),
      setProgrammingLanguageFilter(undefined),
      setDateFilter(undefined),
      setTagsFilter(undefined)
  }

  return (
    <div>
      <div className="m-auto mb-8 flex w-[300px] font-bold lg:mb-2">
        <BlueWhiteButton className="mr-2" onClick={() => setFiltersShown(true)} text="Filter entries" />
        <BlueWhiteButton onClick={() => setSortingShown(true)} text="Sort entries" />
      </div>

      {sorting && <SortEntriesForm onClick={() => setSortingShown(false)} />}

      {filters && (
        <UniversalForm
          header={<strong>Set some filters</strong>}
          closeForm={() => {
            setFiltersShown(false)
          }}
          onSubmit={submitFilters}
        >
          <UniversalInput text="From" type="date" value={minimalDate} onChange={handleMinimalDate} />
          <UniversalInput text="To" type="date" value={maximalDate} onChange={handleMaximalDate} />
          <UniversalInput text="Minimal time" type="number" value={minimalTime} onChange={handleMinimalTime} />
          <UniversalInput text="Maximal time" type="number" value={maximalTime} onChange={handleMaximalTime} />
          <UniversalInput
            text="Programming language"
            value={programmingLanguage}
            onChange={handleProgrammingLanguage}
            //bonusOption={true}
          />
          <SelectRating text="Minimal rating" value={minimalRating} onChange={handleMinimalRating} />
          <SelectRating text="Maximal rating" value={maximalRating} onChange={handleMaximalRating} />
          <Description text="Pick the tags for your entry" />
          <div className={inputSameProperties}>
            {tags.map((tag: ITag) => (
              <div key={tag.id}>
                <input type="checkbox" value={tag.name} checked={picked.includes(tag)} onChange={() => handleTags(tag)} />
                {tag.name}
              </div>
            ))}
          </div>
          <div className="mt-8 flex">
            <FormButton type="submit" text="Submit filters" className="mr-1 bg-button_green" />
            <FormButton onClick={resetFilters} text="Reset all filters" className="bg-button_red" />
          </div>
        </UniversalForm>
      )}

      <div className="w-full flex-wrap lg:flex">
        {records.map((entry: IDiaryEntry) => {
          if (programmingLanguageFilter && entry.programming_language !== programmingLanguageFilter) {
            return false
          }
          if (dateFilter && !(entry.date >= dateFilter[0] && entry.date <= dateFilter[1])) {
            return false
          }
          if (timeFilter && !(entry.time_spent > timeFilter[0] && entry.time_spent < timeFilter[1])) {
            return false
          }
          if (!(entry.rating >= ratingFilter[0] && entry.rating <= ratingFilter[1])) {
            return false
          }
          if (tagsFilter && !entry.tag_ids) {
            return false
          }
          if (tagsFilter && tagsFilter.some((tag) => entry.tag_ids.includes(tag.id) === false)) {
            return false
          } else
            return (
              <Entry
                date={entry.date}
                programming_language={entry.programming_language}
                rating={entry.rating}
                description={entry.description}
                time_spent={entry.time_spent}
                key={entry.id}
                id={entry.id}
                programmer_id={entry.programmer_id}
                tag_ids={entry.tag_ids}
              />
            )
        })}
      </div>
    </div>
  )
}
