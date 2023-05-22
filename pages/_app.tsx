import "../styles/globals.css"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import NextNProgress from "nextjs-progressbar"
import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"

import i18n from "../i18n"
import { store, wrapper } from "../src/store/store"

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 120000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <NextNProgress />
        <Component {...pageProps} />:
      </Provider>
    </I18nextProvider>
  )
}

export default wrapper.withRedux(App)
