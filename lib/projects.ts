import {Projects} from "../types/projects";
import fs from "fs";
import path from "path";

export default (): Projects => {
	const projectsRaw = fs.readFileSync(path.join(process.cwd(), "public/data/projects.json"), "utf8");
	return JSON.parse(projectsRaw);
};