/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const ProgrammingLanguageLogo = ({ programming_language }: { programming_language: string }) => {
  const returnPictureSource = () => {
    switch (programming_language) {
      case "Python":
        return "python_logo.png"
      case "Javascript":
        return "javascript_logo.png"
      case "C++":
        return "C++_logo.png"
      default:
        return "other_languages.png"
    }
  }

  return <img className="m-auto my-4 h-[50px] w-[50px]" src={returnPictureSource()} />
}
