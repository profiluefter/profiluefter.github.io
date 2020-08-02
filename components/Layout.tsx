import React from 'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Link from "next/link";

const Layout: React.FC = ({children}) => (
	<div>
		<Navbar variant="dark" bg="dark" expand="sm" sticky="top">
			<Navbar.Brand>profiluefter.me</Navbar.Brand>
			<Navbar.Toggle/>
			<Navbar.Collapse>
				<Nav>
					<Link href="/"><a className="nav-link">About</a></Link>
					<Link href="/projects"><a className="nav-link">Projects</a></Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		{children}
	</div>
);

export default Layout;