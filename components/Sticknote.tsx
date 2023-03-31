/* eslint-disable tailwindcss/no-custom-classname */
import clsx from "clsx"
import { useState } from "react"

export const Sticknote = ({ content, author, color }: { content: string; author: string, color:any }) => {

  const [contentState, setContentState] = useState(content)
  const [authorState, setAuthorState] = useState(author)
  
  const handleContentChange = (event: any) => {
    setContentState(event.target.value)
  }

  const handleAuthorChange = (event: any) => {
    setAuthorState(event.target.value)
  }

  const getLighterColor = (colorName:"yellow"|"orange"|"red"|"pink"|"purple"|"blue"|"green"|"brown") =>{
    switch (colorName) {
    case "yellow":
      return("bg-[#fff27f]")
    case "orange":
      return("bg-[#ff9966]")
    case "red":
      return("bg-[#ff6666]")
    case "pink":
      return("bg-[#ff99cc]")
    case "purple":
      return("bg-[#cc99ff]")
    case "blue":
      return("bg-[#99ccff]")
    case "green":
      return("bg-[#99ff99]")
    case "brown":
      return("bg-[#cc9966]")
    default:
      return("bg-[#fff27f]")
    }
  }

  return (
    <form className={clsx("m-1 h-[250px] w-[19%] border border-black p-5",getLighterColor(color))}>
      <input 
        value={authorState} 
        className="mt-2 w-full bg-transparent font-bold"
        onChange={handleAuthorChange}
      />
      <br />
      <input 
        className="text-top h-[150px] w-full overflow-scroll border border-black bg-transparent text-left" 
        value={contentState} 
        onChange={handleContentChange}
      />
    </form>
  )
}