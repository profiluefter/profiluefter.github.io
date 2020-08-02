import React from 'react';
import Project from "./Project";
import {Projects} from '../types/projects';

interface ProjectListProps {
	filters: string[];
	search: string;
	projectData: Projects;
}

const ProjectList: React.FC<ProjectListProps> = ({filters, search, projectData}) => {
	const projectElements: JSX.Element[] = [];

	for (const project of projectData.projects) {
		projectElements.push(
			<Project key={project.id} data={project}/>
		);
	}

	return (
		<div className="d-flex flex-wrap justify-content-between w-100">
			{projectElements}
		</div>
	);
};

export default ProjectList;