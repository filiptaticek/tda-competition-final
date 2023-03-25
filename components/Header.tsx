import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"
import { toggleMode } from "../src/store/actions"
import { Sidebar } from "./sidebar/Sidebar"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const Header = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: any) => state.mode)

  return (
    <div>
      <div className="m-auto mb-10 hidden w-[92%] md:flex"> {/*VISIBLE ON COMPUTER*/} 
        <div className="w-[20%]"> 
          <Sidebar hidden/>
        </div>
        <div className={clsx("w-[60%] text-center text-5xl font-bold",mode?"text-white":"")}>
          <p className="m-auto flex w-fit">Programming. <span className={!mode ? "text-light_blue hover:opacity-80" : "text-white"}>&nbsp;Diary</span></p>
        </div>
        <div className="flex w-[20%] justify-end">
          <img
            className="h-[40px] w-[40px] cursor-pointer"
            src={mode ? "zmena_modu_bila.png" : "zmena_modu.png"}
            onClick={() => dispatch(toggleMode())}
          />
        </div>
      </div>

      <>
        <div className="m-auto flex w-full md:hidden"> {/*VISIBLE ON PHONE*/}
          <div className="w-[50%]">
            <Sidebar/>
          </div>
          <div className="flex w-[50%] justify-end">
            <img className="w-[40px] cursor-pointer" src={mode ? "zmena_modu_bila.png" : "zmena_modu.png"} onClick={() => dispatch(toggleMode())} />
          </div>
        </div>
        <p className={clsx("mb-8 mt-4 w-full text-center text-4xl font-bold md:hidden",mode?"text-white":"")}>Programming 
          <span className={clsx(!mode ? "text-light_blue" : "text-white","block")}>Diary.</span>
        </p>
      </>
    </div>
  )
}
