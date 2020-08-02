import React from 'react';
import {Project as ProjectData} from "../types/projects";
import Card from "react-bootstrap/Card";

interface ProjectProps {
	data: ProjectData
}

const Project: React.FC<ProjectProps> = ({data: {title, teaser, language, links}}) => {
	const linkElements: JSX.Element[] = links.map((link, key) => {
		switch (link.type) {
			case "github":
				return <Card.Link key={key} href={"https://github.com/" + link.link}>GitHub</Card.Link>;
			case "gitlab":
				return <Card.Link key={key} href={"https://gitlab.com/" + link.link}>GitLab</Card.Link>;
		}
	});

	return (
		<Card body style={{marginBottom: 5, width: "18rem"}}>
			<Card.Title>{title}</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">{language.name}</Card.Subtitle>
			<Card.Text>{teaser}</Card.Text>
			{linkElements}
		</Card>
	);
};

export default Project;