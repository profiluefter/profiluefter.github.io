import React from "react";
import Link from "next/link";
import Head from "next/head";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Layout from "./Layout";
import {NotionProject} from "../lib/notion";
import {stateString} from "../lib/constants";

interface ProjectDetailsProps {
	data: NotionProject
}

// noinspection HtmlRequiredTitleElement
const ProjectDetails: React.FC<ProjectDetailsProps> = ({data: {properties, page}}) => (
	<Layout title={properties.title}>
		<Head>
			<meta name="description" content={properties.teaser}/>
			<meta name="keywords" content={properties.tags.join(", ")}/>
			<meta name="og:url" content={`https://profiluefter.me/projects/${properties.id}`}/>
			<meta name="og:description" content={properties.teaser}/>
		</Head>
		<Jumbotron>
			<Container>
				<h1>{properties.title}</h1>
				<p>{properties.teaser}</p>
			</Container>
		</Jumbotron>
		<Container>
			<Row>
				<Col className="bg-dark mx-3 p-3 rounded d-flex flex-wrap justify-content-around">
					{properties.links.length > 0 &&
                    <div>
                        <b className="w-100 d-block text-center">Links</b>
                        <div>
							{properties.links.map((link, key) => {
								switch (link.type) {
									case "github":
										return <a key={key} className="mx-1"
										          href={`https://github.com/${link.link}/`}>GitHub</a>;
									case "gitlab":
										return <a key={key} className="mx-1"
										          href={`https://gitlab.com/${link.link}/`}>GitLab</a>;
									case "web":
										return <a key={key} className="mx-1"
										          href={link.link}>Website</a>;
									case "jetbrains":
										return <a key={key} className="mx-1"
										          href={`https://plugins.jetbrains.com/plugin/${link.link}/`}>JetBrains</a>;
								}
							})}
                        </div>
                    </div>
					}
					<div>
						<b className="w-100 d-block text-center">State</b>
						<div><Badge
							variant="info">{stateString[properties.state]}</Badge>
						</div>
					</div>
					{properties.related.length > 0 &&
                    <div>
                        <b className="w-100 d-block text-center">Related Projects</b>
                        <div className="d-flex justify-content-around">{properties.related.map(project =>
							<Link href="/projects/[id]" as={`/projects/${project.id}`} key={project.id}>
								<a className="mx-1">{project.title}</a>
							</Link>
						)}</div>
                    </div>
					}
				</Col>
			</Row>
			<Row className="justify-content-between">
				<Col lg={8} className="bg-dark m-3 p-3 rounded">
					<h3 className="mb-3">Description</h3>
					{/* TODO: Render page */}
				</Col>
				<Col lg={3} className="bg-dark mx-3 m-lg-3 p-3 rounded">
					<h3 className="mb-3">Built with</h3>
					{properties.language}
					<hr className="bg-white"/>
					{properties.usedTechnologies.map(tech =>
						<div key={tech} className="mb-1">{tech}</div>
					)}
				</Col>
			</Row>
		</Container>
	</Layout>
);

export default ProjectDetails;