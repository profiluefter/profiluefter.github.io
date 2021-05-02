import {NotionAPI} from "notion-client";
import {ExtendedRecordMap} from "notion-types";
import {ProjectLink, ProjectState} from "../types/projects";
import {stateString} from "./constants";

export interface NotionProjectProperties {
	id: string;
	notionID: string;
	title: string;
	teaser: string;
	tags: string[];
	links: ProjectLink[];
	state: ProjectState;
	startDate: string;
	endDate: string;
	usedTechnologies: string[];
	language: string;
	related: { id: string, title: string }[];
}

export interface NotionProject {
	properties: NotionProjectProperties
	page: ExtendedRecordMap
}

export const getNotionProjectPages = async (): Promise<NotionProject[]> => {
	const [notionToken, notionPage, notionCollection, notionQuery] =
		["NOTION_TOKEN", "NOTION_PAGE", "NOTION_COLLECTION", "NOTION_QUERY"].map(i => process.env[i]);

	const api = new NotionAPI({authToken: notionToken});
	const data = await api.getPage(notionPage);

	const mappedData = await Promise.all(data.collection_query[notionCollection][notionQuery].blockIds
		.map(async id => { // This maps Notion property ids
			const rawProperties = data.block[id].value.properties;

			const links: ProjectLink[] = [];
			[["github", "O\\Pu"], ["gitlab", "I?x~"], ["web", "ntPE"]].forEach(i => {
				if (rawProperties[i[1]] !== undefined)
					links.push({
						type: i[0] as "github" | "gitlab" | "web",
						link: rawProperties[i[1]][0]
					});
			});

			return ({
				properties: {
					id: rawProperties["bzjW"][0][0],
					notionID: id,
					title: rawProperties["title"][0][0],
					teaser: rawProperties["Ob~?"][0][0],
					links,
					language: rawProperties["\\kw?"] == undefined ? "???" :
						rawProperties["\\kw?"][0][0],
					tags: rawProperties["woh]"] == undefined ? [] :
						rawProperties["woh]"][0][0].split(","),
					state: rawProperties["osI>"] == undefined ? ProjectState.WIP :
						stateString.indexOf(rawProperties["osI>"][0][0]),
					startDate: rawProperties["e<E@"] == undefined ? null :
						rawProperties["e<E@"][0][0],
					endDate: rawProperties["e<E@"] == undefined ? null :
						rawProperties["e<E@"][0][0],
					usedTechnologies: rawProperties["TSPk"] == undefined ? [] :
						rawProperties["TSPk"][0][0].split(","),
					related: rawProperties["]foc"] == undefined ? [] :
						rawProperties["]foc"]
							.filter(i => i[0] == "‣")
							.map(i => i[1][0][1])
							.map(relatedID => ({
								id: relatedID,
								title: "???"
							}))
				},
				page: await api.getPage(id)
			});
		}));

	// Find correct title for related projects
	mappedData.forEach(project => project.properties.related
		.forEach(relatedProject => relatedProject.title =
			mappedData.find(i => i.properties.notionID == relatedProject.id).properties.title));

	return mappedData;
};

export const getNotionProjectPage = async (id: string): Promise<NotionProject> => {
	// TODO: Optimize
	return (await getNotionProjectPages()).find(project => project.properties.id == id);
};