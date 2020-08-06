import React from "react";
import Head from "next/head";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Project} from "../types/projects";
import Layout from "./Layout";

interface ProjectDetailsProps {
	data: Project
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({data}) => {
	const linkElements: JSX.Element[] = data.links.map((link, key) => {
		switch (link.type) {
			case "github":
				return <a key={key} className="mr-3"
				          href={`https://github.com/${link.link}/`}>GitHub</a>;
			case "gitlab":
				return <a key={key} className="mr-3"
				          href={`https://gitlab.com/${link.link}/`}>GitLab</a>;
			case "jetbrains":
				return <a key={key} className="mr-3"
				          href={`https://plugins.jetbrains.com/plugin/${link.link}/`}>JetBrains</a>;
		}
	});

	// noinspection HtmlRequiredTitleElement
	return (
		<Layout title={data.title}>
			<Head>
				<meta name="description" content={data.teaser}/>
				<meta name="keywords" content={data.tags.join(", ")}/>
				<meta name="og:url" content={`https://profiluefter.me/projects/${data.id}`}/>
				<meta name="og:description" content={data.teaser}/>
			</Head>
			<Jumbotron>
				<Container>
					<h1>{data.title}</h1>
					<p>{data.teaser}</p>
				</Container>
			</Jumbotron>
			<Container>
				<Row>
					<Col className="bg-dark mx-3 p-3 rounded" id="links">
						{linkElements}
					</Col>
				</Row>
				<Row className="justify-content-between">
					<Col xs={8} className="bg-dark m-3 p-3 rounded">
						<h3 className="mb-3">Description</h3>
						{data.description}
					</Col>
					<Col xs={3} className="bg-dark m-3 p-3 rounded">
						<h3 className="mb-3">Built with</h3>
						{data.language.name}
						<hr className="bg-white"/>
						{data.usedTechnologies.map(tech =>
							<div key={tech.id} className="mb-1">{tech.name}</div>
						)}
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default ProjectDetails;