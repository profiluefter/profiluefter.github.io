import React from 'react';
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
				return <Card.Link key={key} href={"https://github.com/" + link.link}>GitHub</Card.Link>;
			case "gitlab":
				return <Card.Link key={key} href={"https://gitlab.com/" + link.link}>GitLab</Card.Link>;
		}
	});

	const stateString = ["TODO", "WIP", "Finished", "On Hold", "Abandoned"];

	return (
		<Card body style={{marginBottom: 5, width: "18rem"}}>
			<Card.Title>{title}</Card.Title>
			<Card.Subtitle className="mb-2">
				<span className="text-muted">{language.name}</span>
				<Badge variant="info" className="ml-1">{stateString[state]}</Badge>
			</Card.Subtitle>
			<Card.Text>{teaser}</Card.Text>
			{linkElements}
		</Card>
	);
};

export default Project;