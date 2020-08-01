import 'bootswatch/dist/darkly/bootstrap.min.css'
import {AppProps} from "next/app";

export default function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return <Component {...pageProps} />
}
