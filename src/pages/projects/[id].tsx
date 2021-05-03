import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import ProjectDetails from "../../components/ProjectDetails";
import {getNotionProjectPage, getNotionProjectPages, NotionProject} from "../../lib/notion";

interface ProjectPageProps {
	data: NotionProject
}

const ProjectPage: React.FC<ProjectPageProps> = ({data}) => {
	return (
		<ProjectDetails data={data}/>
	);
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: (await getNotionProjectPages()).map(project => ({
		params: {
			id: project.properties.id
		}
	})),
	fallback: false
});

export const getStaticProps: GetStaticProps = async ({params}) => ({
	props: {
		data: await getNotionProjectPage(params.id as string)
	}
});

export default ProjectPage;