import { Page } from "../components/Page"
import { Header } from "../components/Header"
import { ResponsiveText } from "../components/ReponsiveText"

export default function AboutUs () {
  return (
    <Page>
      <title>CHANGE IT | Homepage</title>
      <Header />
      <ResponsiveText className="text-center">This page was made by programming team of Filip Tatíček on frontend and Martin Doušek on backend.</ResponsiveText>
      <ResponsiveText className="text-center">If you have any feedback how to improve our page, feel free to contact us on fili.taticek@gmail.com</ResponsiveText>
    </Page>
  )
}