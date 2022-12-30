/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Rating } from "../src/types"

export const RatingLogo = ({rating}:{rating:Rating})=>{
  return (
    <div className="h-[40px] flex mt-[5px] mb-[-25px] w-fit m-auto">
      {[...Array(rating)].map((_, i) => (
        <img className="max-h-[25px] w-[25px]" src="star.png" key={i}/>
      ))}
    </div>
  )
}