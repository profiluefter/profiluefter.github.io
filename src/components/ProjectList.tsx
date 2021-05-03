import React from "react";
import ProjectOverview from "./ProjectOverview";
import {NotionProject} from "../lib/notion";

interface ProjectListProps {
	filters: string[];
	search: string;
	projects: NotionProject[];
}

const ProjectList: React.FC<ProjectListProps> = ({filters, search, projects}) => {
	const searchKeywords = search.trim().length == 0 ? [] : search.trim().split(" ");

	const projectElements: JSX.Element[] =
		projects.map(project => project.properties)
			.filter(project =>
				filters.length == 0 ||
				filters.every(tech =>
					project.language === tech ||
					project.usedTechnologies.some(used => used === tech)))
			.filter(project =>
				searchKeywords.length == 0 ||
				searchKeywords.some(keyword =>
					// Search in tags
					project.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) ||
				searchKeywords.some(keyword =>
					// Search in title
					project.title.toLowerCase().includes(keyword.toLowerCase())) ||
				searchKeywords.some(keyword =>
					// Search in usedTechnologies
					project.usedTechnologies.some(used =>
						used.toLowerCase().includes(keyword.toLowerCase()))))
			.map(project => <ProjectOverview key={project.id} project={project}/>);

	// language=CSS
	return (
		<>
			<div className="w-100">
				{projectElements}
			</div>
			<style jsx>{`
                div {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: 3rem;
                }

                @media (min-width: 768px) {
                    div {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 992px) {
                    div {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
			`}</style>
		</>
	);
};

export default ProjectList;