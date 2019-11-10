import React from "react";
import {useStaticQuery, graphql} from "gatsby";

import {rhythm} from "../utils/typography";

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			site {
				siteMetadata {
					author
					social {
						twitter
						github
						devto
					}
				}
			}
		}
	`);

	const {author, social} = data.site.siteMetadata;
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
				full-stack JavaScript enthusiast with main focus on React and testing.
			</p>
			<div>
				<a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
				<a
					style={{marginLeft: rhythm(1 / 2)}}
					href={`https://github.com/${social.github}`}
				>
					GitHub
				</a>
				<a
					style={{marginLeft: rhythm(1 / 2)}}
					href={`https://dev.to/${social.devto}`}
				>
					Dev.to
				</a>
			</div>
		</div>
	);
};

export default Bio;
