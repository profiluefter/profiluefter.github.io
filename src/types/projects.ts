export enum ProjectState {
	TODO = 0,
	Incremental = 1,
	WIP = 2,
	OnHold = 3,
	RewriteNeeded = 4,
	Abandoned = 5,
	Finished = 6
}

export interface Technology {
	id: string;
	name: string;
}

export interface Language {
	id: string;
	name: string;
}

export interface ProjectLink {
	type: "github" | "gitlab" | "jetbrains" | "web",
	link: string
}

interface ProjectCommon {
	id: string,
	title: string,
	teaser: string,
	description: string,
	tags: string[],
}

export interface Project extends ProjectCommon {
	links: ProjectLink[],
	state: ProjectState,
	startDate: Date,
	endDate: Date,
	usedTechnologies: Technology[],
	language: Language
	related: { id: string, title: string }[],
}

export interface RawProject extends ProjectCommon {
	links: {
		type: string,
		link: string
	}[],
	state: string,
	startDate: string,
	endDate: string,
	usedTechnologies: string[],
	language: string
	related: string[],
}

export interface ProjectData {
	projects: Project[];
	technologies: Technology[];
	languages: Language[];
}

export interface RawProjectData {
	projects: RawProject[];
	technologies: Technology[];
	languages: Language[];
}