import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Project} from "../../types/projects";
import getProjects from "../../lib/projects";
import ProjectDetails from "../../components/ProjectDetails";

interface ProjectPageProps {
	data: Project;
}

const ProjectPage: FC<ProjectPageProps> = ({data}) => {
	return (
		<ProjectDetails data={data} />
	);
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: getProjects().projects.map(project => ({
		params: {
			id: project.id
		}
	})),
	fallback: false
});

export const getStaticProps: GetStaticProps = async ({params}) => ({
	props: {
		data: getProjects().projects.find(project => project.id === params.id)
	}
});

export default ProjectPage;