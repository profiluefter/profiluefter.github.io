import React from "react";
import {Project as ProjectData} from "../types/projects";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

interface ProjectProps {
	data: ProjectData
}

const Project: React.FC<ProjectProps> = ({data: {title, teaser, language, links, state}}) => {
	const linkElements: JSX.Element[] = links.map((link, key) => {
		switch (link.type) {
			case "github":
				return <Card.Link key={key} href={`https://github.com/${link.link}/`}>GitHub</Card.Link>;
			case "gitlab":
				return <Card.Link key={key} href={`https://gitlab.com/${link.link}/`}>GitLab</Card.Link>;
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
					{title}
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

export default Project;