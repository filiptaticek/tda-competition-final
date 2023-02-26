/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Rating } from "../src/types"

export const RatingLogo = ({ rating }: { rating: Rating }) => {
  const stars = []

  for (let i = 0; i < rating; i++) {
    stars.push(<img key={i} className="max-h-[25px] w-[25px]" src="star.png" alt="star" />)
  }
  return <div className="m-auto flex w-fit">{stars}</div>
}
