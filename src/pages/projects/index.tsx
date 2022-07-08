/* eslint-disable @typescript-eslint/no-explicit-any */
import {FC, useState} from "react";
import {GetStaticProps} from "next";

import Jumbotron from "react-bootstrap/Jumbotron";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Select from "react-select";

import Layout from "../../components/Layout";
import ProjectList from "../../components/ProjectList";
import getProjects from "../../lib/projects";
import {ProjectData} from "../../types/projects";

interface ProjectListPageProps {
	projects: ProjectData;
}

const ProjectListPage: FC<ProjectListPageProps> = ({projects}) => {
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
			<Layout title="Projects" navbarSelected="projects">
				<Jumbotron>
					<Container>
						<h1>Projects</h1>
						<p>Some of my more mature projects. Each project has a subpage with more information.</p>
					</Container>
				</Jumbotron>
				<Container className="mb-5 px-5 px-md-0">
					<Row className="mb-5">
						<Col md={8} className="p-0 pr-md-3 d-flex align-items-center">
							<FormControl placeholder="Search" onChange={event => setSearch(event.target.value)}
							             defaultValue={search}
							/>
						</Col>
						<Col md={4} className="p-0 pl-md-3">
							<Select placeholder="Filter"
							        onChange={(values => setFilters(values === null ? [] : (values as any[]).map(value => value.value)))}
							        isMulti options={filterData}
							        className="text-dark"/>
						</Col>
					</Row>
					<Row><ProjectList search={search} filters={filters} projectData={projects}/></Row>
				</Container>
			</Layout>
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

export default ProjectListPage;