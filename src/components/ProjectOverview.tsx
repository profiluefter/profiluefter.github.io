import {FC, ReactElement} from "react";
import Link from "next/link";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import {Project} from "../types/projects";

interface ProjectOverviewProps {
	data: Project
}

const ProjectOverview: FC<ProjectOverviewProps> = ({data: {id, title, teaser, language, links, state}}) => {
	const linkElements: ReactElement[] = links.map((link, key) => {
		switch (link.type) {
			case "github":
				return <Card.Link key={key} href={`https://github.com/${link.link}/`}>GitHub</Card.Link>;
			case "gitlab":
				return <Card.Link key={key} href={`https://gitlab.com/${link.link}/`}>GitLab</Card.Link>;
			case "web":
				return <Card.Link key={key} href={link.link}>Website</Card.Link>;
			case "jetbrains":
				return <Card.Link key={key}
				                  href={`https://plugins.jetbrains.com/plugin/${link.link}/`}>JetBrains</Card.Link>;
		}
	});

	const stateString = ["TODO", "WIP", "Finished", "On Hold", "Abandoned"];

	return (
		<Card>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between">
					<Link href="/projects/[id]" as={`/projects/${id}`}><a className="text-white">{title}</a></Link>
					<Badge variant="info">{stateString[state]}</Badge>
				</Card.Title>
				<Card.Subtitle className="mb-2">
					<span className="text-muted">{language.name}</span>
				</Card.Subtitle>
				<Card.Text>{teaser}</Card.Text>
				<div className="mt-auto">
					{linkElements}
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProjectOverview;