import { useState } from "react"

import { saveAs } from "file-saver"
import { useDispatch, useSelector } from "react-redux"

import { getRequest } from "../src/functions"
import { setUser } from "../src/store/actions"
import { State } from "../src/types"
import { FormButton } from "./formParts"
import { UniversalForm } from "./forms"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const MyAccount = () => {
  const dispatch = useDispatch()
  const [detailShown, setDetailShown] = useState<boolean>(false)
  const { mode, user, token } = useSelector((state: State) => state)

  const handleExport = async (event: any) => {
    event.preventDefault()
    const karel = await getRequest("export", token)
    const data = new Blob([karel], { type: "text/csv" })
    saveAs(data, "my_records_data.csv")
  }

  const handleImport = async (event: any) => {
    event.preventDefault()
    console.log("Ahaa")
  }

  const Category = ({ category, value }: { category: string; value: string }) => {
    return (
      <p className="my-2 text-xl">
        <span className="font-bold">{category}: </span>
        {value}
      </p>
    )
  }

  return (
    <>
      <img
        className="mx-6 h-[40px] w-[40px] cursor-pointer md:mx-0 md:mr-8"
        src={mode ? "user_white.png" : "user.png"}
        onClick={() => setDetailShown(true)}
      />
      {detailShown && (
        <UniversalForm
          className="pt-[120px] text-center"
          header={<span className="font-bold">Your account</span>}
          closeForm={() => setDetailShown(false)}
        >
          <Category category="Name" value={user.name} />
          <Category category="Surname" value={user.surname} />
          <Category category="Username" value={user.username} />
          <Category category="Permission" value={user.admin ? "Admin" : "User"} />
          <Category category="Email" value={user.email} />
          <p>Data actions</p>
          <div className="mt-5 flex">
            <FormButton className="mr-2 bg-button_green" type="submit" onClick={handleExport} text="Import records" />
            <FormButton className="mr-2 bg-button_green" type="submit" onClick={handleExport} text="Export records" />
          </div>
          <p>Account actions</p>
          <FormButton className="bg-button_red" text="Log out" onClick={() => {dispatch(setUser(null)), window.localStorage.clear()}}/>
        </UniversalForm>
      )}
    </>
  )
}
