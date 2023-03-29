import "../styles/globals.css"
import NextNProgress from "nextjs-progressbar"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store, wrapper } from "../src/store/store"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress />
      <Component {...pageProps} />:
    </Provider>
  )
}

export default wrapper.withRedux(App)
