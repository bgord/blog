import React from "react";
import {Link, graphql} from "gatsby";

import Social from "../components/social";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Type from "../components/type";
import {rhythm, scale} from "../utils/typography";

class BlogPostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const {previous, next} = this.props.pageContext;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title={post.frontmatter.title}
					description={post.frontmatter.description || post.excerpt}
				/>
				<article>
					<header>
						<h1
							style={{
								marginTop: rhythm(1),
								marginBottom: rhythm(0.5),
							}}
						>
							{post.frontmatter.title}
						</h1>

						<Type type={post.frontmatter.type} />

						<p
							style={{
								...scale(-1 / 5),
								display: `block`,
								marginTop: rhythm(1 / 8),
								marginBottom: rhythm(1),
							}}
						>
							{post.frontmatter.date}
						</p>
					</header>
					<section dangerouslySetInnerHTML={{__html: post.html}} />
					<hr
						style={{
							marginBottom: rhythm(1),
						}}
					/>
					<footer>
						<Social />
					</footer>
				</article>

				<nav>
					<ul
						style={{
							display: `flex`,
							flexWrap: `wrap`,
							justifyContent: `space-between`,
							listStyle: `none`,
							padding: 0,
							marginTop: rhythm(1),
						}}
					>
						<li>
							{previous && (
								<Link to={previous.fields.slug} rel="prev">
									← Previous article
								</Link>
							)}
						</li>
						<li>
							{next && (
								<Link to={next.fields.slug} rel="next">
									Next article →
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(fields: {slug: {eq: $slug}}) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				type
			}
		}
	}
`;
