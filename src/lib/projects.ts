import {ProjectData, RawProjectData} from "../types/projects";
import fs from "fs";
import path from "path";

const readProjectData = (): ProjectData => {
	const projectsRaw = fs.readFileSync(path.join(process.cwd(), "public/data/projects.json"), "utf8");
	const projectData: RawProjectData = JSON.parse(projectsRaw);

	projectData.projects.forEach((project, index, projects) => {
		projects[index] = Object.assign({}, {
			// Defaults
			description: project.teaser,
			links: [],
			startDate: null,
			endDate: null
		}, project, {
			//Overrides
			language: projectData.languages.find(language => language.id === project.language),
			usedTechnologies: project.usedTechnologies.map(id =>
				projectData.technologies.find(technology => technology.id === id)),
			state: ["todo", "wip", "finished", "on-hold", "abandoned"].indexOf(project.state),
			related: project.related === undefined ?
				[] :
				project.related.map(id => ({id, title: projectData.projects.find(project => project.id === id).title}))
		});
	});

	return <ProjectData><unknown>projectData;
};

export default readProjectData;
