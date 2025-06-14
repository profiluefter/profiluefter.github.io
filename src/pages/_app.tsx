import "bootswatch/dist/darkly/bootstrap.min.css";
import {AppProps} from "next/app";
import {ReactElement} from "react";

export default function MyApp({Component, pageProps}: AppProps): ReactElement {
	return <Component {...pageProps} />;
}
