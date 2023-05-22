import clsx from "clsx"
import { useSelector } from "react-redux"

import { State } from "../src/types"

export const ResponsiveText = ({
  children,
  className
}: {
  children: any
  className?: string
}) => {
  const { mode } = useSelector((state: State) => state)

  return (
    <p className={clsx(mode ? "text-white" : "text-black", className)}>
      {children}
    </p>
  )
}
