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
                  content: 'summary',
                },
                {
                  name: 'twitter:creator',
                  content: '@LGutweter',
                },
                {
                  name: 'twitter:title',
                  content: this.props.title || data.site.siteMetadata.title,
                },
                {
                  name: 'twitter:description',
                  content: data.site.siteMetadata.description,
                },
                {
                  name: 'google-site-verification',
                  content: 'rseXimMeas_Go1AhnSKitwqqlxJswkXEbQ3y-a90BSQ',
                },
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
              <div className={classes.menuLinks}>
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
              </div>
              <div className={classes.subscribe}>
                {'Subscribe By: '}
                <a onClick={this.showSubscribeModal}>Email</a>
                {' / '}
                <a href="/rss.xml">RSS</a>
              </div>
            </nav>
            <div className={classes.pageBodyWrapper}>{this.props.children}</div>
          </div>
        )}
      />
    )
  }
}

export default Layout
