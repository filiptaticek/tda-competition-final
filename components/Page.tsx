import { useSelector } from "react-redux"

export const Page = ({ children }: { children: any }) => {
  const mode = useSelector((state: any) => state.mode)

  return (
    <div className={`min-h-screen duration-300 ${mode ? "bg-main_color" : ""}`}>
      <div className="m-auto w-full max-w-page_max overflow-hidden p-5">{children}</div>
    </div>
  )
}
