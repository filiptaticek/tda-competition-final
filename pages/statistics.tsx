import { Page } from "../components/Page"
import { Header } from "../components/Header"
import { ResponsiveText } from "../components/ReponsiveText"
import { useEffect } from "react"
import { getRequest } from "../src/functions/api/get"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import clsx from "clsx"

export default function OtherPage () {

  const [bootTime, setBootTime] = useState<string>("")
  const [version, setVersion] = useState<string>("")
  const [numberOfCommits, setNumberOfCommits] = useState<string>("")
  const [lastCommit, setLastCommit] = useState<string>("")
  const [ramUsage, setRamUsage] = useState<string>("")
  const [cpuLoad, setCpuLoad] = useState<string>("")
  const [discUsage, setDiscUsage] = useState<string>("")
  const mode = useSelector((state: any) => state.mode)
  const {t} = useTranslation()

  useEffect(() => {
    const initialInterval = async () =>{
      const uptimeData = await getRequest("/basics/uptime")
      const basicsData = await getRequest("/basics/commits")
      const monitorData = await getRequest("/monitor/info")
      console.log("KARLÍKU",monitorData)
      setCpuLoad(monitorData.cpu_load)
      setRamUsage(monitorData.ram_usage)
      setDiscUsage(monitorData.disk_usage)
      setNumberOfCommits(basicsData.count)
      setLastCommit(basicsData.last.description)
      setBootTime(uptimeData.boot_time)
      setVersion(uptimeData.platform)
    }

    initialInterval()

    const regularInterval = setInterval(async () => {
      const uptimeData = await getRequest("/basics/uptime")
      const basicsData = await getRequest("/basics/commits")
      const monitorData = await getRequest("/monitor/info")
      setCpuLoad(monitorData.cpu_load)
      setRamUsage(monitorData.ram_usage)
      setDiscUsage(monitorData.disk_usage)
      setNumberOfCommits(basicsData.count)
      setLastCommit(basicsData.last.description)
      setBootTime(uptimeData.boot_time)
      setVersion(uptimeData.platform)
    }, 3000)
    
    return () => clearInterval(regularInterval)
  }, [])

  const HalfContainer = ({children}:{children:any})=>{
    return(
      <div className={clsx("h-[250px] w-[50%] p-10",mode?"border border-white":"border border-black")}>
        {children}
      </div>
    )
  }

  return (
    <Page>
      <title>Sticknotes | Statistics</title>
      <Header />
      <div className="flex w-full border border-black">
        <HalfContainer>
          <ResponsiveText className="text-center text-2xl font-bold">
            {t("basic_commits")}:
          </ResponsiveText><br/>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">{t("number_of_commits")}: </span> {lastCommit}
          </ResponsiveText>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">{t("Last_commit")}:</span> {numberOfCommits}
          </ResponsiveText>
        </HalfContainer>
        <HalfContainer>
          <ResponsiveText className="text-center text-2xl font-bold">
            {t("Uptime")}
          </ResponsiveText><br/>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">{t("Boot_time")}: </span> {bootTime}
          </ResponsiveText>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">{t("System_version")}:</span> {version}
          </ResponsiveText>
        </HalfContainer>
      </div>
      <div className="flex">
        <div className="h-[250px] w-[70%] border border-black p-10">
          <p>GRAF</p>
        </div>
        <div className="h-[250px] w-[30%] border border-black p-10">
          <ResponsiveText className="text-center text-2xl font-bold">
            {t("Usage")}
          </ResponsiveText><br/>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">CPU:</span> {cpuLoad}
          </ResponsiveText>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">RAM:</span> {ramUsage}
          </ResponsiveText>
          <ResponsiveText className="text-center text-xl">
            <span className="font-bold">{t("Disc")}:</span> {discUsage}
          </ResponsiveText>
        </div>
      </div>
    </Page>
  )
}