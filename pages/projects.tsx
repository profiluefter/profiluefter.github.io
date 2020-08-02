import React, {useState} from 'react';
import {GetStaticProps} from "next";

import Jumbotron from "react-bootstrap/Jumbotron";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Select from "react-select";

import Layout from "../components/Layout";
import ProjectList from "../components/ProjectList";
import getProjects from "../lib/projects";
import {Projects} from "../types/projects";

interface ProjectsProps {
	projects: Projects;
}

const ProjectPage: React.FC<ProjectsProps> = ({projects}) => {
	const [search, setSearch] = useState<string>();
	const [filters, setFilters] = useState<string[]>();

	return (
		<Layout>
			<Jumbotron>
				<h1>Projects</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi error eum exercitationem, in ipsum
					itaque iure minima neque non officiis quam quo quos reprehenderit, repudiandae tempore, temporibus
					vero
					voluptates.</p>
			</Jumbotron>
			<Container>
				<Row className="mb-5">
					<Col className="pl-0" sm={8}>
						<FormControl placeholder="Search" onChange={event => setSearch(event.target.value)}/>
					</Col>
					<Col className="pr-0" sm={4}>
						<Select placeholder="Filter" onChange={(event => setFilters(event.target.value))}/>
					</Col>
				</Row>
				<Row><ProjectList search={search} filters={filters} projectData={projects}/></Row>
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			projects: getProjects()
		}
	};
};

export default ProjectPage;