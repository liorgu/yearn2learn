const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                generatedIndexes {
                  filters
                  title
                  description
                  pathPrefix
                }
              }
            }
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fileAbsolutePath
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date(formatString: "MMMM DD, YYYY")
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        const generatedIndexes = result.data.site.siteMetadata.generatedIndexes

        generatedIndexes.forEach(generatedIndex => {
          const { filters, title, description, pathPrefix } = generatedIndex
          createPaginatedPages({
            edges: posts.filter(post =>
              filters.some(filter =>
                post.node.fileAbsolutePath.includes(`/${filter}/`)
              )
            ),
            createPage,
            pageTemplate: 'src/templates/index.js',
            pathPrefix,
            context: {
              title,
              description,
            },
          })
        })

        posts.forEach((post, index) => {
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = node.frontmatter.slug || createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
