import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"

import { toggleMode } from "../src/store/actions"
import { MyAccount } from "./MyAccount"
import { Sidebar } from "./sidebar/Sidebar"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const Header = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: any) => state.mode)

  return (
    <div>
      <div className="m-auto mb-10 flex w-[92%]"> 
        <Sidebar hidden/>
        <div className={clsx("hidden w-[60%] text-center text-5xl font-bold md:flex",mode?"text-white":"")}>
          <p className="m-auto flex">Programming. <span className={!mode ? "text-main_color" : "text-white"}>Diary</span></p>
        </div>
        <p className={clsx("w-full text-center text-4xl font-bold md:hidden",mode?"text-white":"")}>
          Programming 
          <span className={clsx(!mode ? "text-main_color" : "text-white","block")}>Diary.</span>
        </p>
        <div className="hidden w-[20%] justify-end pt-2 md:flex"> {/*VISIBLE ON COMPUTER*/}
          <MyAccount />
          <img
            className="h-[40px] w-[40px] cursor-pointer"
            src={mode ? "zmena_modu_bila.png" : "zmena_modu.png"}
            onClick={() => dispatch(toggleMode())}
          />
        </div>
      </div>
      <div className="m-auto mb-8 flex w-fit md:hidden">
        <Sidebar/>
        <MyAccount />
        <img className="w-[40px] cursor-pointer" src={mode ? "zmena_modu_bila.png" : "zmena_modu.png"} onClick={() => dispatch(toggleMode())} />
      </div>
    </div>
  )
}
