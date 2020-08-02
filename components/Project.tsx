import React from 'react';
import {Projects} from "../types/projects";

interface ProjectProps {
	data: Projects["projects"][0]
}

const Project: React.FC<ProjectProps> = ({data: {title, teaser}}) => {
	return (
		<div style={{height: 400, width: 250, backgroundColor: "gray"}} className="mb-5">
			<h3>{title}</h3>
			<p>{teaser}</p>
		</div>
	);
};

export default Project;