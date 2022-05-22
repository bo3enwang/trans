import "../styles/globals.css";
import "../styles/nprogress.css"; //styles of nprogress
import type { AppProps } from "next/app";
import "@uiw/react-textarea-code-editor/dist.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
