import React from "react";

import {rhythm} from "../utils/typography";
import Social from "./social";

const Bio = () => {
	return (
		<div
			style={{
				display: `flex`,
				flexDirection: "column",
				marginBottom: rhythm(2.5),
			}}
		>
			<p>
				Hi, I'm a full-stack JavaScript developer from Warsaw, Poland with main
				focus on React, testing, and REST APIs.
			</p>
			<Social />
		</div>
	);
};

export default Bio;
