import { useSelector } from "react-redux"
import clsx from "clsx"

export const Page = ({ children, className }: { children: any, className?: string }) => {
  const mode = useSelector((state: any) => state.mode)

  return (
    <div className={clsx("min-h-screen border border-[#000000] duration-300",mode ? "bg-main_color" : "")}>
      <div className={clsx("m-auto w-full max-w-page_max overflow-hidden border border-black p-5",className)}>{children}</div>
    </div>
  )
}
