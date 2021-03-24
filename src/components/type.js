import React from "react";

import {rhythm} from "../utils/typography";

export default function Type(props) {
	return (
		<div>
			<small
				style={{
					background: "#e0f2fe",
					padding: rhythm(1 / 8),
					marginRight: rhythm(1 / 4),
				}}
			>
				{props.type}
			</small>
		</div>
	);
}
