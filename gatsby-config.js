module.exports = {
  siteMetadata: {
    title: 'Yearn 2 Learn',
    author: 'Lior Gutweter',
    description: 'Collect and share knowledge about web development',
    siteUrl: 'https://yearn2learn.netlify.com',
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'About',
        link: '/about',
      },
      {
        name: 'Posts',
        link: '/posts',
      },
      {
        name: 'Links',
        link: '/weekly-links',
      },
      {
        name: 'Resources',
        link: '/resources',
      },
    ],
    generatedIndexes: [
      {
        pathPrefix: '',
        title: 'Yearn 2 Learn',
        description: 'Collect and share knowledge about web development',
        filters: ['posts', 'weekly-links'],
      },
      {
        pathPrefix: 'posts',
        title: 'Posts',
        description: 'Technical Posts About Web Development',
        filters: ['posts'],
      },
      {
        pathPrefix: 'weekly-links',
        title: 'Weekly Links',
        description: 'Useful links for developers, published every Saturday',
        filters: ['weekly-links'],
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-130951015-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fileAbsolutePath: { regex: "/posts/|/weekly-links/" } }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Gatsby RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Yearn 2 Learn`,
        short_name: `Y2L`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#999999`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: `https://twitter.us19.list-manage.com/subscribe/post?u=d5ad90af0e05b78d9c083b6b0&amp;id=4fe3f67572`,
      },
    },
  ],
}
