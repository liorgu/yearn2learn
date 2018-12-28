import React from 'react'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'

import Bio from '../components/Bio'
import Layout from '../components/Layout'

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <header>
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.date}</h2>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr />
      <Bio />
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
