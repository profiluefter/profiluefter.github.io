import React from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Project} from "../types/projects";
import Layout from "./Layout";

interface ProjectDetailsProps {
	data: Project
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({data}) => (
	<Layout title={data.title}>
		<Jumbotron>
			<Container>
				<h1>{data.title}</h1>
				<p>{data.teaser}</p>
			</Container>
		</Jumbotron>
		<Container>
			<Row>
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

export default ProjectDetails;