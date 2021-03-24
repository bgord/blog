import React from "react";
import {useStaticQuery, graphql} from "gatsby";

import {rhythm} from "../utils/typography";

const Social = () => {
	const data = useStaticQuery(graphql`
		query SocialQuery {
			site {
				siteMetadata {
					author
					social {
						github
						devto
					}
				}
			}
		}
	`);

	const {social} = data.site.siteMetadata;

	return (
		<div>
			<div style={{display: "inline-block", marginRight: rhythm(0.5)}}>
				You can catch me here:
			</div>
			<a
				style={{marginLeft: rhythm(1 / 8)}}
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
	);
};

export default Social;
