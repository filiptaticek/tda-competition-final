/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Language } from "../src/types"

export const ProgrammingLanguageLogo = ({programming_language}:{programming_language:Language})=>{

  const returnPictureSource = ()=>{
    switch (programming_language) {
    case "Python":
      return("python_logo.png")
    case "Javascript":
      return("javascript_logo.png")
    default:
      return("c++_logo.png")
    }
  }

  return(
    <img
      className="w-[50px] h-[50px] mt-2 mb-[-10px] m-auto"
      src={returnPictureSource()}
    />
  )
}