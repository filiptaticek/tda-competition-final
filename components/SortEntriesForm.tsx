import { useState } from "react"
import { UniversalForm } from "./UniversalForm"
import { inputSameProperties } from "../src/constants"
import { Description } from "./Description"
import { Sorting } from "../src/types"
import { sorting } from "../src/constants"
import { FormButton } from "./FormButton"
import { useDispatch } from "react-redux"
import { sortEntriesFromHighestRating, sortEntriesFromLongest, sortEntriesFromLowestRating, sortEntriesFromNewest, sortEntriesFromOldest, sortEntriesFromShortest } from "../src/store/actions"

export const SortEntriesForm = ({onClick}:{onClick:any})=>{

  const [sortType,setSortType] = useState<Sorting>("no sorting")
  const dispatch = useDispatch()

  const handleSorting =()=>{
    event?.preventDefault()
    onClick()

    switch (sortType) {
    case "from oldest":
      dispatch(sortEntriesFromOldest())
      break
    case "from newest":
      dispatch(sortEntriesFromNewest())
      break
    case "from worst rating":
      dispatch(sortEntriesFromLowestRating())
      break
    case "from best rating":
      dispatch(sortEntriesFromHighestRating())
      break
    case "from shortest":
      dispatch(sortEntriesFromShortest())
      break
    case "from longest":
      dispatch(sortEntriesFromLongest())
      break
    }
  }

  return(
    <UniversalForm header="Sort entries" closeForm={onClick} onSubmit={handleSorting}>
      <Description text={"Pick how you want to sort your entries"} />
      <select 
        className={inputSameProperties} 
        value={sortType} 
        onChange={(event:any) => {setSortType(event.target.value)}}>
        {sorting.map(type=>{
          return(
            <option value={type} key={type}>{type}</option>
          )
        })}
      </select>
      <div className="flex mt-10">
        <FormButton className="bg-button_green m-auto" type="submit" text="Sort the entries"/>
      </div>
    </UniversalForm>
  )
}