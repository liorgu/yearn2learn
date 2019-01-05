import React from 'react'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import classes from './blog-post.module.scss'

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div className={classes.contentWrapper}>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <h2>{post.frontmatter.date}</h2>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <Bio />
      </div>
      <hr />
      <DiscussionEmbed
        shortname="yearn2learn"
        config={{
          identifier: post.id,
          title: post.frontmatter.title,
        }}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
