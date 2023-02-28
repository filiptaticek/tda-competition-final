/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux"
import { State } from "../src/types"

export const ProgrammingLanguageLogo = ({ programming_language, form }: { programming_language: string, form?:boolean }) => {

  const { mode } = useSelector((state: State) => state)

  const returnPictureSource = () => {
    switch (programming_language) {
    case "Python":
      return "python_logo.png"
    case "Javascript":
      return "javascript_logo.png"
    case "C++":
      return "C++_logo.png"
    default:
      return (form?"other_language.png":mode?"other_language_white.png":"other_language.png")
    }
  }

  return <img className="m-auto my-4 h-[50px] w-[50px]" src={returnPictureSource()} />
}
