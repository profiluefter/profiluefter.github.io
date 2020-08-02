import {ProjectData, RawProjectData} from "../types/projects";
import fs from "fs";
import path from "path";

export default (): ProjectData => {
	const projectsRaw = fs.readFileSync(path.join(process.cwd(), "public/data/projects.json"), "utf8");
	const projectData: RawProjectData = JSON.parse(projectsRaw);

	projectData.projects.forEach((project, index, projects) => {
		projects[index] = Object.assign({}, {
			// Defaults
			description: project.teaser,
			links: [],
			related: [],
			startDate: null,
			endDate: null
		}, project, {
			//Overrides
			language: projectData.languages.find(language => language.id === project.language),
			usedTechnologies: project.usedTechnologies.map(id =>
				projectData.technologies.find(technology => technology.id === id)),
			state: ["todo", "wip", "finished", "on-hold", "abandoned"].indexOf(project.state)
		});
	});

	return <ProjectData><unknown>projectData;
};