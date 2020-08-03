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
					project.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) ||
				searchKeywords.some(keyword => project.title.toLowerCase().includes(keyword.toLowerCase())))
			.map(project => <Project key={project.id} data={project}/>);

	return (
		<>
			<div className="w-100">
				{projectElements}
			</div>
			<style jsx>{`
				div {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					grid-gap: 3rem;
				}
			`}</style>
			<style global>{`
				html {
				overflow-y: scroll;
				}
			`}</style>
		</>
	);
};

export default ProjectList;