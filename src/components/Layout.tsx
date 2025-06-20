import {FC, ReactNode} from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Link from "next/link";
import Head from "next/head";

interface LayoutProps {
	title: string,
	navbarSelected?: string,
	children: ReactNode
}

const Layout: FC<LayoutProps> = ({children, title, navbarSelected}) => (
	<>
		<Head>
			<title>{title + " | profiluefter.me"}</title>
			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="profiluefter.me" />
			<link rel="me" href="https://layer8.space/@profiluefter" />
		</Head>
		<Navbar variant="dark" bg="dark" expand="sm" sticky="top">
			<Navbar.Brand>profiluefter.me</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Nav>
					<Link href="/"><a
						className={"nav-link" + (navbarSelected === "home" ? " active" : "")}>About</a></Link>
					<Link href="/projects"><a
						className={"nav-link" + (navbarSelected === "projects" ? " active" : "")}>Projects</a></Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		{children}
	</>
);

export default Layout;
