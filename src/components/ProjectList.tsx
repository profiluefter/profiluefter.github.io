import {FC, ReactElement} from "react";
import ProjectOverview from "./ProjectOverview";
import {ProjectData} from "../types/projects";

interface ProjectListProps {
	filters: string[];
	search: string;
	projectData: ProjectData;
}

const ProjectList: FC<ProjectListProps> = ({filters, search, projectData}) => {
	const searchKeywords = search.trim().length == 0 ? [] : search.trim().split(" ");

	const projectElements: ReactElement[] =
		projectData.projects
			.filter(project =>
				filters.length == 0 ||
				filters.every(tech =>
					project.language.id === tech ||
					project.usedTechnologies.some(used => used.id === tech)))
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
						used.name.toLowerCase().includes(keyword.toLowerCase()) ||
						used.id.toLowerCase().includes(keyword.toLowerCase()))))
			.map(project => <ProjectOverview key={project.id} data={project}/>);

	// language=CSS
	return (
		<>
			<div className="w-100">
				{projectElements}
			</div>
			<style>{`
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