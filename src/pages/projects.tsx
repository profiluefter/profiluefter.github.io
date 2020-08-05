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
import {ProjectData} from "../types/projects";

interface ProjectsProps {
	projects: ProjectData;
}

const ProjectPage: React.FC<ProjectsProps> = ({projects}) => {
	const [search, setSearch] = useState<string>("");
	const [filters, setFilters] = useState<string[]>([]);

	const filterData = [
		{
			label: "Languages",
			options: projects.languages.map(language => ({value: language.id, label: language.name}))
		},
		{
			label: "Technologies",
			options: projects.technologies.map(technology => ({value: technology.id, label: technology.name}))
		}
	];

	return (
		<>
			<Layout title="Projects">
				<Jumbotron>
					<h1>Projects</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi error eum exercitationem, in
						ipsum
						itaque iure minima neque non officiis quam quo quos reprehenderit, repudiandae tempore,
						temporibus
						vero
						voluptates.</p>
				</Jumbotron>
				<Container className="mb-5">
					<Row className="mb-5">
						<Col className="pl-0 d-flex align-items-center" sm={8}>
							<FormControl placeholder="Search" onChange={event => setSearch(event.target.value)}
							             defaultValue={search}
							/>
						</Col>
						<Col className="pr-0" sm={4}>
							{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
							<Select placeholder="Filter"
							        onChange={(values => setFilters(values === null ? [] : (values as any[]).map(value => value.value)))}
							        isMulti options={filterData}
							        className="text-dark"/>
						</Col>
					</Row>
					<Row><ProjectList search={search} filters={filters} projectData={projects}/></Row>
				</Container>
			</Layout>
			<style global jsx>{`
				html {
				overflow-y: scroll;
				}
			`}</style>
		</>
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