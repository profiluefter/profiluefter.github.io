import React from 'react';
import Project from "./Project";
import {ProjectData} from '../types/projects';

interface ProjectListProps {
	filters: string[];
	search: string;
	projectData: ProjectData;
}

const ProjectList: React.FC<ProjectListProps> = ({filters, search, projectData}) => {
	const searchKeywords = search.trim().length == 0 ? [] : search.trim().split(" ");

	const projectElements: JSX.Element[] =
		projectData.projects
			.filter(project =>
				filters.length == 0 ||
				filters.every(tech =>
					project.language.id === tech ||
					project.usedTechnologies.some(used => used.id === tech)))
			.filter(project =>
				searchKeywords.length == 0 ||
				searchKeywords.some(keyword =>
					project.tags.some(tag => tag.includes(keyword))))
			.map(project => <Project key={project.id} data={project}/>);

	return (
		<div className="d-flex flex-wrap justify-content-between w-100">
			{projectElements}
		</div>
	);
};

export default ProjectList;