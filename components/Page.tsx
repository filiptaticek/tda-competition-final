import { useSelector } from "react-redux"

export const Page = ({children}:{children:any})=>{

  const mode = useSelector((state:any) => state.mode)

  return(
    <div className={`duration-300 min-h-screen ${mode?"bg-main_color":""}`}>
      <div className="max-w-page_max m-auto overflow-hidden w-full p-5">
        {children}
      </div>
    </div>
  )
}