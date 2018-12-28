import React from 'react'

import Img from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'
import classes from './Bio.module.scss'

const Bio = () => (
  <StaticQuery
    query={graphql`
      query {
        liorImage: file(relativePath: { eq: "lior.png" }) {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <div className={classes.wrapper}>
        <Img fixed={data.liorImage.childImageSharp.fixed} />
        <div className={classes.text}>
          <div>Written by</div>
          <div>
            <strong>Lior Gutweter</strong>
          </div>
        </div>
      </div>
    )}
  />
)

export default Bio
