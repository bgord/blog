import {useStaticQuery, graphql} from "gatsby";
import React from "react";

import {rhythm} from "../utils/typography";
import Social from "./social";

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			site {
				siteMetadata {
					author
				}
			}
		}
	`);

	const {author} = data.site.siteMetadata;
	return (
		<div
			style={{
				display: `flex`,
				flexDirection: "column",
				marginBottom: rhythm(2.5),
			}}
		>
			<p>
				Hello, I'm <strong>{author}</strong> from Poznań, Poland. I'm a
				full-stack JavaScript developer with main focus on React and testing.
			</p>
			<Social />
		</div>
	);
};

export default Bio;
