import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import classes from './Layout.module.scss'
import SubscribeModal from './SubscribeModal'

// Import typeface
import 'typeface-merriweather'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubscribeModalOpen: false,
    }
  }

  showSubscribeModal = () => {
    this.setState({ isSubscribeModalOpen: true })
  }

  hideSubscribeModal = () => {
    this.setState({ isSubscribeModalOpen: false })
  }

  pageBody() {
    const { posts, title, description, children } = this.props
    if (children) return children
    return (
      <>
        <header>
          <h1>{title}</h1>
          <h2>{description}</h2>
        </header>
        {posts &&
          posts.map(({ node }) => {
            const postTitle = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <div>
                  <strong>{node.frontmatter.date}</strong>
                </div>
                <h3 className={classes.postTitle}>
                  <Link to={node.fields.slug}>{postTitle}</Link>
                </h3>
              </div>
            )
          })}
      </>
    )
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            background: file(relativePath: { eq: "background.jpg" }) {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            twitter: file(relativePath: { eq: "twitter.png" }) {
              childImageSharp {
                fixed(width: 32, height: 32) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            github: file(relativePath: { eq: "github.png" }) {
              childImageSharp {
                fixed(width: 24, height: 24) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            linkedin: file(relativePath: { eq: "linkedin.png" }) {
              childImageSharp {
                fixed(width: 24, height: 24) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            rss: file(relativePath: { eq: "rss.png" }) {
              childImageSharp {
                fixed(width: 24, height: 24) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            email: file(relativePath: { eq: "email.png" }) {
              childImageSharp {
                fixed(width: 28, height: 28) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            site {
              siteMetadata {
                title
                description
                menuLinks {
                  name
                  link
                }
              }
            }
          }
        `}
        render={data => (
          <div className={classes.pageWrapper}>
            <Helmet
              htmlAttributes={{ lang: 'en' }}
              meta={[
                {
                  name: 'description',
                  content: data.site.siteMetadata.description,
                },
                {
                  name: 'twitter:card',
                  content: 'summary'
                },
                {
                  name: 'twitter:creator',
                  content: '@LGutweter'
                },
                {
                  name: 'twitter:title',
                  content: data.site.siteMetadata.title,
                },
                {
                  name: 'twitter:description',
                  content: data.site.siteMetadata.description
                },
                { 
                  name: 'google-site-verification', 
                  content: 'rseXimMeas_Go1AhnSKitwqqlxJswkXEbQ3y-a90BSQ' 
                }
              ]}
              title={data.site.siteMetadata.title}
            />
            <Img
              fluid={data.background.childImageSharp.fluid}
              className={classes.backgroundImage}
            />
            <SubscribeModal
              isOpen={this.state.isSubscribeModalOpen}
              closeModal={this.hideSubscribeModal}
            />

            <nav className={classes.navBar}>
              <div>
                {data.site.siteMetadata.menuLinks.map(link => (
                  <Link key={link.name} to={link.link}>
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className={classes.iconsWrapper}>
                <a href="https://twitter.com/LGutweter">
                  <Img fixed={data.twitter.childImageSharp.fixed} />
                </a>
                <a href="https://github.com/liorgu">
                  <Img fixed={data.github.childImageSharp.fixed} />
                </a>
                <a href="https://www.linkedin.com/in/lior-gutweter-46156394">
                  <Img fixed={data.linkedin.childImageSharp.fixed} />
                </a>
                <a href="/rss.xml">
                  <Img fixed={data.rss.childImageSharp.fixed} />
                </a>
                <a onClick={this.showSubscribeModal}>
                  <Img fixed={data.email.childImageSharp.fixed} />
                </a>
              </div>
            </nav>
            <div className={classes.pageBodyWrapper}>{this.pageBody()}</div>
          </div>
        )}
      />
    )
  }
}

export default Layout
