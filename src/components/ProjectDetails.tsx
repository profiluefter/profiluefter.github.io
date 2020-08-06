import React from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

import {Project} from "../types/projects";
import Layout from "./Layout";

interface ProjectDetailsProps {
	data: Project
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({data: {title, teaser}}) => (
	<Layout title={title}>
		<Jumbotron>
			<Container>
				<h1>{title}</h1>
				<p>{teaser}</p>
			</Container>
		</Jumbotron>
		<Container>

		</Container>
	</Layout>
);

export default ProjectDetails;